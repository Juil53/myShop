import { constant } from "../../constants";

const initialState = {
  current: constant.ENG,
  header: {
    top_nav: {
      search: {
        ENG: "Search here...",
        VI: "Tìm kiếm...",
      },
      login: {
        ENG: "Login",
        VI: "Đăng nhập",
      },
      register: {
        ENG: "Register",
        VI: "Đăng ký",
      },
      cart: {
        ENG: "Your cart",
        VI: "Giỏ hàng",
      },
    },
    nav: {
      home: {
        ENG: "Home",
        VI: "Trang chủ",
      },
      product: {
        ENG: "Product",
        VI: "Sản phẩm",
      },
      news: {
        ENG: "News",
        VI: "Tin tức",
      },
      about: {
        ENG: "About",
        VI: "Giới thiệu",
      },
      map: {
        ENG: "Map",
        VI: "Bản đồ",
      },
      contact: {
        ENG: "Contact",
        VI: "Liên hệ",
      },
    },
  },
  footer: {
    top_footer: {
      left: {
        home: {
          ENG: "Home",
          VI: "Trang chủ",
        },
        product: {
          ENG: "Product",
          VI: "Sản phẩm",
        },
        about: {
          ENG: "About",
          VI: "Giới thiệu",
        },
        news: {
          ENG: "News",
          VI: "Tin tức",
        },
        map: {
          ENG: "Map",
          VI: "Bản đồ",
        },
        contact: {
          ENG: "Contact",
          VI: "Liên hệ",
        },
      },
      mid: {
        address: {
          ENG: "Room 16 Hall 8 Quang Trung software city, Tan Chanh Hiep ward, 12 Dictrict, Ho Chi Minh City",
          VI: "Phòng 16, Tòa 8, Công viên phần mềm Quang Trung, Phường Tân Chánh Hiệp, quận 12, Thành phố Hồ Chí Minh",
        },
      },
      right: {
        about: {
          title: {
            ENG: "About us",
            VI: "Về công ty chúng tôi",
          },
          content: {
            ENG: "Breshka clothes is top VietNam brand fashion. <br /> Modern shopping type - Convenient, Safe payment - Easy",
            VI: "Breshka clothes là thương hiệu thời trang hàng đầu Việt Nam. <br/> Mua sắm theo phong cách hiện đại - Tiện lợi, Thanh toán an toàn - Dễ dàng",
          },
        },
      },
    },
    source: {
      ENG: "Copyright belong to Breshka Viet Nam",
      VI: "Bản quyền thuộc sở hữu của Breshka Việt Nam",
    },
  },
};

export function language(state = initialState, action) {
  switch (action.type) {
    case constant.CHANGE_LANGUAGE:
      return {
        ...state,
        current: action.language,
      };
    default:
      return state;
  }
}
