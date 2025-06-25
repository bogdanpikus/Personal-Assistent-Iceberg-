module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
        port: "", // �����, ���� ���� �� ������������ ���� (������ 443 ��� https)
        pathname: "/**", // ��� ����
      },
    ],
  },
};
