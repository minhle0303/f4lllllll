import { Drawer, Descriptions, Typography, Image } from "antd";

const { Title, Text } = Typography;

const ViewClubDetail = (props) => {
  const { dataDetail, setDataDetail, isDataDetailOpen, setIsDataDetailOpen } = props;

  return (
    <Drawer
      title={<Title level={4}>Club Detail</Title>}
      onClose={() => {
        setDataDetail(null);
        setIsDataDetailOpen(false);
      }}
      open={isDataDetailOpen}
      width={500}
      footer={
        <Text type="secondary">
          Thank you for using our service. For more details, please contact support.
        </Text>
      }
    >
      {dataDetail ? (
        <>
          <Descriptions
            bordered
            column={1}
            size="small"
            labelStyle={{ fontWeight: "bold", width: "30%" }}
            contentStyle={{ background: "#fafafa" }}
          >
            <Descriptions.Item label="ID">{dataDetail.id}</Descriptions.Item>
            <Descriptions.Item label="Name">{dataDetail.name}</Descriptions.Item>
            <Descriptions.Item label="Address">{dataDetail.address}</Descriptions.Item>
            <Descriptions.Item label="Contact Phone">{dataDetail.contactPhone}</Descriptions.Item>
            <Descriptions.Item label="Description">{dataDetail.description}</Descriptions.Item>
            <Descriptions.Item label="Open Time">{dataDetail.openHour}</Descriptions.Item>
            <Descriptions.Item label="Close Time">{dataDetail.closeHour}</Descriptions.Item>
            <Descriptions.Item label="Rooms">
              {dataDetail.rooms && dataDetail.rooms.length > 0 ? (
                dataDetail.rooms.map((room, index) => (
                  <div key={index}>
                    <Text>{room.roomName}</Text>
                  </div>
                ))
              ) : (
                <Text type="secondary">No rooms available</Text>
              )}
            </Descriptions.Item>
          </Descriptions>
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <Title level={5}>Club Images</Title>
            {dataDetail.clubImages && dataDetail.clubImages.length > 0 ? (
              dataDetail.clubImages.map((image, index) => (
                <Image
                  key={index}
                  src={image.imageUrl}
                  alt={`Club Image ${index + 1}`}
                  style={{ maxHeight: "200px", borderRadius: "10px", margin: "10px 0" }}
                  placeholder
                />
              ))
            ) : (
              <Text type="secondary">No images available</Text>
            )}
          </div>
        </>
      ) : (
        <div style={{ textAlign: "center", color: "red" }}>
          <h3>Don't have anything here!</h3>
        </div>
      )}
    </Drawer>
  );
};

export default ViewClubDetail;
