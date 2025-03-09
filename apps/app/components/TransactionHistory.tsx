import { Color, FontFamily, FontSize } from "@/GlobalStyles";
import {
  Transaction,
  TransactionWithConversionRate,
  useHistory,
} from "@/hooks/useHistory";
import { Button, ScrollView, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import Btn from "./Btn";
import { Gap } from "@/GlobalStyles";
import HistoryRow from "./HistoryRow";
import { useCurrency } from "@/hooks/useCurrency";
import { useState } from "react";
import { useOrders } from "@/hooks/useOrders";

export function TransactionHistory() {
  //   const [page, setPage] = useState(0);
  const [from, setFrom] = useState(
    new Date(Date.now() - 1000 * 60 * 60 * 24 * 30)
  );
  const [to, setTo] = useState(new Date());
  const { currency } = useCurrency();
  const {
    data: transactions,
    isLoading,
    error,
  } = useHistory({
    from,
    to,
    currency,
  });
  const { data: orders, refetch: refetchOrders } = useOrders({
    currency,
  });

  if (isLoading && !transactions) return <Text>Loading transactions...</Text>;
  if (error) return <Text>Error loading transactions</Text>;
  if (!transactions?.length) return <Text>No transactions found</Text>;
  console.log("transactions", transactions);

  //   const totalPages = Math.ceil((data.total || 0) / ITEMS_PER_PAGE);

  return (
    <View style={[styles.history]}>
      <View style={[styles.historyParent, styles.frameGroupFlexBox]}>
        <Text style={[styles.history1, styles.historyTypo]}>History</Text>
        <Button
          title="Refresh"
          onPress={() => {
            setFrom(new Date(Date.now() - 1000 * 60 * 60 * 24 * 30));
            setTo(new Date());
            refetchOrders();
          }}
        />
        {/* <Text style={styles.e325027}>E£3,250.27</Text> */}
      </View>
      <ScrollView
        contentContainerStyle={{
          rowGap: 8,
        }}
      >
        {transactions
          ?.concat(...(orders || []))
          ?.map((tx: TransactionWithConversionRate) => (
            <HistoryRow key={tx.hash} transaction={tx} />
          ))}
        <Btn
          caption="Load more"
          variant="List"
          onButtonPress={() => {
            setFrom(new Date(from.setDate(from.getDate() - 7)));
            setTo(new Date());
          }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  frameGroupFlexBox: {
    gap: Gap.gap_3xs,
    alignSelf: "stretch",
  },
  historyTypo: {
    color: Color.dardColor,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
  },
  history1: {
    fontSize: FontSize.subtitle1_size,
    textAlign: "left",
  },
  e325027: {
    fontFamily: FontFamily.textMdL24Regular,
    color: Color.taglineColor,
    fontSize: FontSize.caption_size,
    textAlign: "left",
  },
  historyParent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  viewAllHistory: {
    lineHeight: 18,
    textAlign: "center",
    flex: 1,
    fontSize: FontSize.caption_size,
  },
  history: {
    paddingLeft: 16,
    paddingRight: 16,
    alignSelf: "stretch",
  },
});
