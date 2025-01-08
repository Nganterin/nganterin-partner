"use client";

import { useEffect, useState } from "react";
import { BaseContainer } from "../BaseContainer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { toast } from "sonner";
import fetchWithAuth from "@/utilities/fetchWithAuth";
import { BASE_API } from "@/utilities/environment";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const ReservationTable = () => {
  const [hotelData, setHotelData] = useState<any>([]);
  const [activeHotelIndex, setActiveHotelIndex] = useState<number>(0);
  const [reservationData, setReservationData] = useState([]);

  const fetchHotelData = async () => {
    try {
      const res = await fetchWithAuth(BASE_API + "/partner/hotel/getall", {
        method: "GET",
      });

      const data = await res.json();
      if (res.ok) {
        fetchReservationData(data.data[0].id);
        setHotelData(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Connection failed");
    }
  };

  const fetchReservationData = async (hotelID: string) => {
    try {
      const res = await fetchWithAuth(
        BASE_API + `/partner/reservation/hotel/getall?id=${hotelID}`,
        {
          method: "GET",
        }
      );

      const data = await res.json();
      if (res.ok) {
        setReservationData(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Connection failed");
    }
  };

  useEffect(() => {
    fetchHotelData();
  }, []);

  return (
    <BaseContainer>
      <div className="mb-5">
        <Select
          defaultValue={activeHotelIndex.toString()}
          onValueChange={(e) => {
            const index = parseInt(e);

            setActiveHotelIndex(index);
            fetchReservationData(hotelData[index].id);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {hotelData?.map((item: any, index: number) => {
              return (
                <SelectItem value={index.toString()} key={index}>
                  {item.name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">No</TableHead>
            <TableHead className="">Email</TableHead>
            <TableHead className="min-w-[200px]">Name</TableHead>
            <TableHead className="">Room Type</TableHead>
            <TableHead className="text-center">Duration (days)</TableHead>
            <TableHead className="text-right">Check In</TableHead>
            <TableHead className="text-right">Check Out</TableHead>
            <TableHead className="">Ref</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservationData?.map((item: any, index) => {
            const checkInDate = new Date(item.check_in_date);
            const checkOutDate = new Date(item.check_out_date);

            return (
              <TableRow key={index}>
                <TableCell className="text-xs ">{index + 1}</TableCell>
                <TableCell className="text-xs ">{item.user.email}</TableCell>
                <TableCell className="text-xs ">{item.user.name}</TableCell>
                <TableCell className="text-xs ">
                  {item.hotel_room.type}
                </TableCell>
                <TableCell className="text-xs text-center">
                  {item.total_days}
                </TableCell>
                <TableCell className="text-xs text-right">
                  {checkInDate.toDateString()}
                </TableCell>
                <TableCell className="text-xs text-right">
                  {checkOutDate.toDateString()}
                </TableCell>
                <TableCell className="text-xs font-mono opacity-70">
                  {item.id}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </BaseContainer>
  );
};
