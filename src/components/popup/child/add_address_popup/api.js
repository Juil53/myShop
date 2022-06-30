import api from "../../../../service";

const LOCALTION_BASE_URL = "https://tiki.vn/api/v2/directory";

const getLocation = async (path) => {
  try {
    const { data } = await api.get({
      baseUrl: LOCALTION_BASE_URL,
      path,
    });

    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const getRegions = async () => {
  const path = "regions?country_id=vn";
  const rs = await getLocation(path);

  return rs;
};

export const getDistricts = async (regionId) => {
  const path = `districts?region_id=${regionId}`;
  const rs = await getLocation(path);

  return rs;
};

export const getWards = async (districtId) => {
  const path = `wards?district_id=${districtId}`;
  const rs = await getLocation(path);

  return rs;
};
