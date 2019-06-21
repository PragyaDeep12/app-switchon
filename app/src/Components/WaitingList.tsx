import React, { useEffect } from "react";
import { useState } from "react";
import RequestMessage from "../Models/RequestMessage";
import { socket } from "../Dao/SocketDAO";
export default function WaitingList() {
  const [requestList, setRequestList]: [Array<RequestMessage>, any] = useState(
    []
  );

  const [request, setRequest] = useState<RequestMessage>();
  useEffect(() => {
    socket.on("newRequest", (data: any) => {
      data.map((item: RequestMessage, index: number) => {
        if (item) setRequest(item);
      });
    });
  }, []);
  useEffect(() => {
    setRequestList([...requestList, request]);
  }, [request]);
  return <div>This is the list waiting to be approved</div>;
}
