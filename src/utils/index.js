export const delay = (time) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });

export const clone = (obj) => JSON.parse(JSON.stringify(obj)); //tao vung nho moi, khong tro truc tiep vao data goc tranh truong hop thay doi du lieu khong mong muon
