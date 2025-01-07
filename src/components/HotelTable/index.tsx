import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import fetchWithAuth from "@/utilities/fetchWithAuth";
import { BASE_API } from "@/utilities/environment";
import { IoIosStar } from "react-icons/io";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";

export function HotelTable() {
  const [hotelData, setHotelData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetchWithAuth(BASE_API + "/partner/hotel/getall", {
        method: "GET",
      });

      const data = await res.json();
      if (res.ok) {
        setHotelData(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Connection failed");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card className="w-full h-full bg-slate-50 rounded-lg p-2 shadow-lg shadow-sky-800/30">
      <CardHeader>
        <CardTitle>Your Hotels</CardTitle>
        <CardDescription>A list of your registered hotels.</CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-scroll">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[200px]">Name</TableHead>
              <TableHead className="text-right">Rating</TableHead>
              <TableHead className="text-right">Cleanliness</TableHead>
              <TableHead className="text-right">Comfort</TableHead>
              <TableHead className="text-right">Service</TableHead>
              <TableHead className="text-right">Facilities</TableHead>
              <TableHead className="text-center">Act</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hotelData.map((item: any, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="">
                  <div className="flex flex-row gap-1 items-center justify-end">
                    {item.review_statistic.average_rating}
                    <IoIosStar color="#f59e0b" size={14} />
                  </div>
                </TableCell>
                <TableCell className="">
                  <div className="flex flex-row gap-1 items-center justify-end">
                    {item.rating.cleanliness}
                    <IoIosStar color="#f59e0b" size={14} />
                  </div>
                </TableCell>
                <TableCell className="">
                  <div className="flex flex-row gap-1 items-center justify-end">
                    {item.rating.comfort}
                    <IoIosStar color="#f59e0b" size={14} />
                  </div>
                </TableCell>
                <TableCell className="">
                  <div className="flex flex-row gap-1 items-center justify-end">
                    {item.rating.service_quality}
                    <IoIosStar color="#f59e0b" size={14} />
                  </div>
                </TableCell>
                <TableCell className="">
                  <div className="flex flex-row gap-1 items-center justify-end">
                    {item.rating.facilities}
                    <IoIosStar color="#f59e0b" size={14} />
                  </div>
                </TableCell>
                <TableCell>
                  <Link
                    href={`https://nganterin.web.id/detail/hotel/${item.id}`}
                    target="_blank"
                    className="flex items-center justify-center"
                  >
                    <GoArrowUpRight size={14} />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
