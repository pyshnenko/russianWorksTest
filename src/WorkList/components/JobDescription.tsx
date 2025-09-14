import React from 'react';
import { Box, Text } from '@react-native-material/core';
import { StyleSheet } from 'react-native';
import Paper from '../../ui/Paper';
import type { ApiReqObjectType } from '../../types/api';

interface PropsType {
  data: ApiReqObjectType;
}

/**
 *
 * @param data - объект с данными о работе
 * @returns нижний блок карточки вакансии
 */
export default function JobDescription({ data }: PropsType): React.ReactNode {
  return (
    <Paper elevation={8} style={style.paperMarg}>
      <Box style={style.boxMarg}>
        <Text style={style.text}>{data.address}</Text>
        <Text style={style.text}>{data.dateStartByCity}</Text>
        <Text style={style.text}>
          Смена: {data.timeStartByCity} - {data.timeEndByCity}
        </Text>
        <Text style={style.text}>
          Уже набрано сотрудников: {data.currentWorkers}
        </Text>
        <Text style={style.text}>
          Планируется сотрудников: {data.planWorkers}
        </Text>
        <Text style={style.text}>
          Выплата за смену: {data.priceWorker} рублей
        </Text>
      </Box>
    </Paper>
  );
}

const style = StyleSheet.create({
  text: {
    margin: 4,
  },
  paperMarg: { marginTop: 8 },
  boxMarg: { margin: 8 },
});
