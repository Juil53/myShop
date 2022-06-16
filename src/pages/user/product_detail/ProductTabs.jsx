import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Product Info" {...a11yProps(0)} disableRipple />
          <Tab label="Payment & Shipping" {...a11yProps(1)} disableRipple />
          <Tab label="Reviews" {...a11yProps(2)} disableRipple />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Giày thể thao nam đẹp da màu nâu cao cấp, thanh lịch từ thương hiệu Zala® Chất liệu giày
        bằng da bò mềm với chi tiết mũi giày cap-toe Mắt xỏ dây âm với dây cột nylon Lót trong bằng
        da thoáng khí tự nhiên Đệm lót giày bằng da bọc thoải mái và hỗ trợ chân Đế ngoài băng cao
        su hấp thụ sốc tốt và bám tốt trên mọi bề mặt Được thành lập vào năm 1978, thương hiệu Nine
        West xuất phát từ địa chỉ ở thành phố New York. Trong 30 năm, Nine West đã phát triển và trở
        thành người đứng đầu trong lĩnh vực thời trang nổi tiếng thế giới. Ngày nay, giầy - túi xách
        - trang sức Nine West được yêu mến bởi phụ nữ trên toàn thế giới và được xem như một chuyên
        gia tư vấn đáng tin cậy trong mọi lĩnh vực thời trang, bao gồm cả thời trang trẻ em.
      </TabPanel>
      <TabPanel value={value} index={1}>
        Nội dung tùy chỉnh viết ở đây
      </TabPanel>
      <TabPanel value={value} index={2}>
        OKE!
      </TabPanel>
    </Box>
  );
}
