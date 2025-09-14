import React, { memo, useEffect, useCallback } from 'react';
import { Box, IconButton, Text, useTheme } from '@react-native-material/core';
import { ApiReqObjectType } from '../../types/api';
import { Image, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import JobDescription from './JobDescription';
import { fullCardStyle as style } from './styles';

const CloseIcon = (iconProps: any) => <Icon name="close" {...iconProps} />;

/**
 * Компонент для отображения карточки с подробной информацией о вакансии
 */

export default memo(function FullCard(props: PropsType): React.ReactNode {
  const { setOpenCardIndex, cardData } = props;
  const theme = useTheme();

  const backActionCallback = useCallback(() => {
    // Создаем useCallback для предотвращения пересоздания
    setOpenCardIndex(-1);
    return true;
  }, [setOpenCardIndex]);

  /**
   * Привяжем закрытие к кнопке "Назад"
   */
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backActionCallback,
    );

    return () => backHandler.remove();
  }, [setOpenCardIndex, backActionCallback]);

  return (
    <Box
      style={[
        style.fullCardStyle,
        { backgroundColor: theme.palette.background.main },
      ]}
    >
      <IconButton
        style={style.iconButtonStyle}
        icon={CloseIcon}
        onPress={() => setOpenCardIndex(-1)}
      />
      <Box style={style.vacantBox}>
        <Box style={style.imgBox}>
          <Image source={{ uri: cardData.logo }} width={100} height={100} />
          {cardData.customerRating !== null && (
            <Box style={style.raitingBox}>
              <Text variant="h5">{cardData.customerRating}/5</Text>
              <Icon
                color={theme.colorScheme === 'dark' ? '#FFFFFF' : '#000000'}
                size={24}
                name="star"
              />
            </Box>
          )}
          <Text>{cardData.customerFeedbacksCount}</Text>
        </Box>
        <Box style={style.compNameBox}>
          {cardData.workTypes.map(item => (
            <Text variant="h5" key={item.id}>
              {item.nameOne.replaceAll('-', ' - ')}
            </Text>
          ))}
          <Text style={style.textWrap} variant="h6">
            {cardData.companyName}
          </Text>
        </Box>
      </Box>
      <JobDescription data={cardData} />
    </Box>
  );
});

interface PropsType {
  cardData: ApiReqObjectType;
  setOpenCardIndex: (i: number) => void;
}
