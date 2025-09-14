import React, { memo } from 'react';
import { Box, Text } from '@react-native-material/core';
import Paper from '../../ui/Paper';
import { Image } from 'react-native';
import { WorkType } from '../../types/api';
import { SmallCardStyle as style } from './styles';

interface SmallCardProps {
  logo: string;
  companyName: string;
  workTypes: WorkType[];
  priceWorker: number;
}
/**
 * Компонент маленькой карточки вакансии
 * @param props - минимальные сведения о вакансии
 * @returns компонент
 */
export default memo(function SmallCard(props: SmallCardProps): React.ReactNode {
  const { logo, companyName, workTypes, priceWorker } = props;

  return (
    <Paper style={style.box}>
      <Box>
        {workTypes.map((item: WorkType) => (
          <Text style={style.textBold} key={item.id}>
            {item.nameOne}
          </Text>
        ))}
        <Text>{priceWorker} руб. за смену</Text>
        <Text style={style.otherText}>{companyName}</Text>
      </Box>
      <Image source={{ uri: logo }} width={50} height={50} />
    </Paper>
  );
});
