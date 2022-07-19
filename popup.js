const copyFn = (text) => {
  const type = "text/plain";
  const blob = new Blob([text], { type });
  const data = [new ClipboardItem({ [type]: blob })];
  window.navigator.clipboard
    .write(data)
    .then(() => {
      console.log("done");
    })
    .catch(() => {
      console.log("input 模式");
      const input = document.querySelector("#input");
      input.value = `${title} ${url}`;
      input.select(); // 选中文本
      input.focus(); // 选中文本
      document.execCommand("copy"); // 执行浏览器复制命令
      console.log(title, url);
    });
};

let title = "";
let url = "";
let copyText = "";

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  title = tabs[0].title;
  url = tabs[0].url;
  copyText = `${title} ${url}`;
  document.querySelector("#title").innerHTML = `${title}`;
  document.querySelector("#url").innerHTML = `${url}`;
  copyFn(copyText);
});

document.querySelector("#copy-button").addEventListener("click", () => {
  copyFn(copyText);
});
