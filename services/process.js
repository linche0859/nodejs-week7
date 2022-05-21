// 捕捉程式錯誤
process.on('uncaughtException', (err) => {
  // 記錄錯誤下來，等到服務都處理完後，停掉該 process
  console.error('Uncaughted Exception！');
  console.error(err);
  process.exit(1);
});

// 補捉未處理的 catch
process.on('unhandledRejection', (reason, promise) => {
  // 記錄於 log 上
  console.error('未捕捉到的 rejection：', promise, '原因：', reason);
});
