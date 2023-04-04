import React from 'react';
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';

type PropTypes = {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
};
const TFAPopup = ({ isModalOpen, setIsModalOpen }: PropTypes) => {
  const { t } = useTranslation();

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      footer={null}
      title={t('Google Two Factor Authentication')}
      open={isModalOpen}
      onCancel={handleCancel}>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla aliquid
        eum vitae quo nostrum necessitatibus. Obcaecati nesciunt magnam hic sit
        aliquam ut, minus quas quis assumenda esse. Minus atque reprehenderit
        numquam doloribus ducimus vitae aut necessitatibus, repudiandae
        obcaecati, nesciunt incidunt eveniet. Deleniti quo consequatur
        voluptatibus odit ratione et magnam. Ex quibusdam facilis tenetur id
        aperiam saepe. Inventore, alias. Odio quis rem dignissimos in
        laudantium. Reprehenderit nihil quibusdam quo saepe esse quam cum,
        dignissimos quia quod, inventore explicabo natus illo fugiat, error
        adipisci incidunt ea eum ullam aspernatur ex? Tempora quae architecto
        dignissimos quas officiis dicta excepturi facere velit id repellendus.
      </p>
    </Modal>
  );
};

export default TFAPopup;
