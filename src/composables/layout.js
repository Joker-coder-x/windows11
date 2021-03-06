import { onMounted, onUnmounted } from "vue";

import config from "@/config";

import {
  getStyles,
  pagePos,
  layoutNamespace,
  $on,
  $off
} from "utils";

import { SET_APP_ITEM_SIZE } from "store/mutation-types";

const layoutConfig = config.layout;

export default function initLayout (apps, oDesktop, store) {
  let layoutInfo = [],
      appItemSize = {
        width: 0,
        height: 0
      };

  const setLayoutInfo = () => setAppItemSize(oDesktop, store,  apps, layoutInfo, appItemSize);

  onMounted(() => {
    setLayoutInfo();
    $on(window, 'resize', setLayoutInfo, false);
  });
  onUnmounted(() => $off(window, 'resize', setLayoutInfo, false));

  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();

    const { x, y } = pagePos(e),
          appid = + e.dataTransfer.getData("appid");

    const pos = findAsideGridPos(
      x,
      y,
      layoutInfo,
      appItemSize.width,
      appItemSize.height,
      layoutConfig.rowGap,
      layoutConfig.columnGap
    );

    if (appid && pos) {
      const oPosInfo = findAppItemInLayoutPos(appid, layoutInfo);
      changeAppItemLayout(layoutInfo, oPosInfo, pos);
    }
  };

  const handleSetAppId = ({ item, appid }) => item.appid = appid;

  return {
    handleDragOver,
    handleDrop,
    handleSetAppId
  };
}

const setAppItemSize = (oDesktop, store, apps, layoutInfo, appItemSize) => {
  const { width, height } = getAppItemSize(
    oDesktop.value,
    layoutConfig.row,
    layoutConfig.column,
    layoutConfig.rowGap,
    layoutConfig.columnGap
  );

  appItemSize.width = width;
  appItemSize.height = height;
  store.commit(layoutNamespace(SET_APP_ITEM_SIZE), { width, height });

  // 初始化布局信息
  const newLayoutInfo = initLayOutInfo(
    layoutConfig.row,
    layoutConfig.column,
    layoutConfig.rowGap,
    layoutConfig.columnGap,
    width,
    height
  );

  if (layoutInfo.length) {
    mergeLayoutInfo(newLayoutInfo, layoutInfo);
  } else {
    layoutInfo.push(...newLayoutInfo);
    setLayout(layoutInfo, apps, layoutConfig.row, layoutConfig.column);
  }
};

function getAppItemSize (elem, row, column, rowGap, columnGap) {
  const width = parseInt(getStyles(elem, 'width')) ,
        height = parseInt(getStyles(elem, 'height'));

  return {
    width: (width - ((column - 1) * columnGap)) / column,
    height:(height - ((row - 1) * rowGap)) / row
  };
}

function initLayOutInfo (row, column, rowGap, columnGap, itemWidth, itemHeight) {
  const computedItemLayoutInfo = (row, column, rowGap, columnGap, itemWidth, itemHeight) => {
     return {
      x: (column * itemWidth) + (column * columnGap),
      y:  (row * itemHeight) + (row * rowGap),
      app: null
    };
  }

  const layoutInfo = new Array(row);

  for (let i = 0, l = row; i < l; i++) {
      layoutInfo[i] = new Array(column);

      for (let j = 0; j < column; j++) {
        layoutInfo[i][j] = computedItemLayoutInfo(i, j, rowGap, columnGap, itemWidth, itemHeight);
      }
  }

  return layoutInfo;
}

/**
 * 设置布局
 */
function setLayout (layoutInfo, apps, rowCount, columnCount) {
  let m = 0,
      n = 0,
      item;

  for (let i = 0, l = apps.length; i < l; i++) {
    n = i - (m * rowCount);

    if (n >= rowCount) {
      n = 0;
      m ++;
    }

    if (m >= columnCount) {
      throw new RangeError("应用过多");
    }

    item = layoutInfo[n][m];

    if (item) {
      const appItem = apps[i];
      appItem.x = item.x;
      appItem.y = item.y;
      item.app = appItem;
    }
  }
}

/**
 * 找到最近的网格坐标
 */
function findAsideGridPos (x, y, layoutInfo, itemWidth, itemHeight, rowGap, columnGap) {
  let row,
      item;
  for (let i = 0, l = layoutInfo.length; i < l; i++) {
    row = layoutInfo[i];
    for (let j = 0, k = row.length; j < k; j++) {
      item = row[j];

      if(
        x >= item.x && x <= (item.x + itemWidth + columnGap) &&
        y >= item.y && y <= (item.y + itemHeight + rowGap)
      ){
        return {
          x: item.x,
          y: item.y,
          row: i,
          column: j
        };
      }
    }
  }
}

function findAppItemInLayoutPos (appid, layoutInfo) {
  let row,
      item;

  for (let i = 0, l = layoutInfo.length; i < l; i++) {
    row = layoutInfo[i];
    for (let j = 0, k = row.length; j < k; j++) {
      item = row[j];

      if(item.app && item.app.appid === appid){
        return {
          row: i,
          column: j
        };
      }
    }
  }
}

function changeAppItemLayout (layoutInfo, oldPos, newPos) {
  const oRow = oldPos.row,
        oCol = oldPos.column,
        nRow = newPos.row,
        nCol = newPos.column;

  const newAppItem = layoutInfo[nRow][nCol],
        oldAppItem = layoutInfo[oRow][oCol];

  if (newAppItem.app) {
    // 这个位置已经存在app了
    return false;
  }

  newAppItem.app = oldAppItem.app;
  newAppItem.app.x = newAppItem.x;
  newAppItem.app.y = newAppItem.y;
  oldAppItem.app = null;
}

function mergeLayoutInfo (newLayoutInfo, oldLayoutInfo) {
  let row, newItem, oldItem;

  for (let i = 0, l = oldLayoutInfo.length; i < l; i ++) {
    row = oldLayoutInfo[i];
    for (let j = 0, k = row.length; j < k; j ++) {
      oldItem = row[j];
      newItem = newLayoutInfo[i][j];

      oldItem.x = newItem.x;
      oldItem.y = newItem.y;

      if (oldItem.app) {
        const app = oldItem.app;
        app.x = oldItem.x;
        app.y = oldItem.y;
      }
    }
  }
}