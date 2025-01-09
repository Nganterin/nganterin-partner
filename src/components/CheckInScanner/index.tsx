"use client";

import { IDetectedBarcode } from "@yudiel/react-qr-scanner";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { QRCodeReader } from "../QRCodeReader";
import { BaseContainer } from "../BaseContainer";
import fetchWithAuth from "@/utilities/fetchWithAuth";
import { BASE_API } from "@/utilities/environment";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";

export const CheckInScanner = () => {
  const [scanData, setScanData] = useState<IDetectedBarcode>();
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [reservationData, setReservationData] = useState<any>();
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const detailsModal = useDisclosure();
  const successModal = useDisclosure();
  const failedModal = useDisclosure();

  useEffect(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );
        setDevices(videoDevices);
        setDeviceId(videoDevices[0].deviceId);
      })
      .catch((err) => {
        toast.error("Error accessing media devices:", err);
      });
  }, []);

  const handleScan = async (key: string) => {
    try {
      setIsFetching(true);
      const res = await fetchWithAuth(
        BASE_API + `/partner/reservation/hotel/details?key=${key}`,
        {
          method: "GET",
        }
      );

      const data = await res.json();
      if (res.ok) {
        setReservationData(data.data);
        detailsModal.onOpen();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Connection error");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (scanData) {
      setIsPaused(true);
      handleScan(scanData.rawValue);
    }
  }, [scanData]);

  const handleCheckIn = async (key: string) => {
    try {
      setIsLoading(true);
      const res = await fetchWithAuth(
        BASE_API + `/partner/reservation/hotel/checkin?key=${key}`,
        {
          method: "POST",
        }
      );

      if (res.ok) {
        successModal.onOpen();
        toast.success("Check In success");
      } else {
        const data = await res.json();
        setErrorMessage(data.message);
        failedModal.onOpen();
      }
    } catch (err) {
      console.error(err);
      const message = "Connection error";

      setErrorMessage(message);
      toast.error(message);

      failedModal.onOpen();
    } finally {
      setIsLoading(false);
    }
  };

  const ReservationStatus = ({ status }: Readonly<{ status: any }>) => {
    if (status == "Confirmed") {
      return (
        <div className="text-xs px-2 py-1 bg-gradient-to-r from-sky-500 to-sky-700 text-white rounded-lg">
          Confirmed
        </div>
      );
    } else {
      return (
        <div className="text-xs px-2 py-1 bg-gradient-to-r from-rose-500 to-rose-700 text-white rounded-lg">
          Checked-In
        </div>
      );
    }
  };

  return (
    <div className="flex flex-wrap gap-4">
      <div className="w-max">
        <BaseContainer
          title="Camera Device"
          description="Please select a camera device"
        >
          <Select
            defaultValue={deviceId || ""}
            onValueChange={(index) =>
              setDeviceId(devices[parseInt(index)].deviceId)
            }
          >
            <SelectTrigger className="min-w-[280px]">
              <SelectValue placeholder="Select a camera" />
            </SelectTrigger>
            <SelectContent>
              {devices.map((item, index) => {
                return (
                  <SelectItem key={index} value={index.toString()}>
                    {item.label}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </BaseContainer>
      </div>
      <div className="w-max relative">
        {isFetching && (
          <div className="absolute inset-0 bg-black/70 rounded-xl z-40 flex items-center justify-center">
            <Spinner color="white" size="lg" />
          </div>
        )}
        <BaseContainer
          title="QR Reservation Reader"
          description="Please scan digital QR Reservation here"
        >
          <QRCodeReader
            deviceId={deviceId}
            isPaused={isPaused}
            setResult={setScanData}
          />
        </BaseContainer>
      </div>
      <Modal
        isOpen={detailsModal.isOpen}
        onOpenChange={detailsModal.onOpenChange}
        isDismissable={false}
        onClose={() => {
          setScanData(undefined);
          setReservationData(null);
          setIsPaused(false);
        }}
      >
        <ModalContent>
          {(onClose) => {
            const checkInDate = new Date(reservationData?.check_in_date);
            const checkOutDate = new Date(reservationData?.check_out_date);
            const currentDate = new Date();

            return (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {reservationData.hotel.name} Reservation
                </ModalHeader>
                <ModalBody>
                  <table className="w-max">
                    <thead>
                      <tr>
                        <th className="w-max"></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="w-max text-xs uppercase opacity-80 pr-4">
                          Name
                        </td>
                        <td className="text-sm ">
                          : {reservationData.user.name}
                        </td>
                      </tr>
                      <tr>
                        <td className="w-max text-xs uppercase opacity-80 pr-4">
                          Email
                        </td>
                        <td className="text-sm ">
                          : {reservationData.user.email}
                        </td>
                      </tr>
                      <tr>
                        <td className="w-max text-xs uppercase opacity-80 pr-4">
                          Room Type
                        </td>
                        <td className="text-sm ">
                          : {reservationData.hotel_room.type}
                        </td>
                      </tr>
                      <tr>
                        <td className="w-max text-xs uppercase opacity-80 pr-4">
                          Smoking Room
                        </td>
                        <td className="text-sm ">
                          :{" "}
                          {reservationData.hotel_room.smoking_allowed
                            ? "Yes"
                            : "No"}
                        </td>
                      </tr>
                      <tr>
                        <td className="w-max text-xs uppercase opacity-80 pr-4">
                          Total Days
                        </td>
                        <td className="text-sm ">
                          : {reservationData.total_days}
                        </td>
                      </tr>
                      <tr>
                        <td className="w-max text-xs uppercase opacity-80 pr-4">
                          Check In Date
                        </td>
                        <td className="text-sm ">
                          : {checkInDate.toDateString()}
                        </td>
                      </tr>
                      <tr>
                        <td className="w-max text-xs uppercase opacity-80 pr-4">
                          Check Out Date
                        </td>
                        <td className="text-sm ">
                          : {checkOutDate.toDateString()}
                        </td>
                      </tr>
                      <tr>
                        <td className="w-max text-xs uppercase opacity-80 pr-4">
                          Reservation Status
                        </td>
                        <td className="text-sm flex flex-row gap-1 items-center">
                          :{" "}
                          <ReservationStatus
                            status={
                              reservationData.hotel_reservation
                                .reservation_status
                            }
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="mt-4">
                    <p className="text-xs opacity-70 font-normal text-right uppercase">
                      Ref #{reservationData.id}
                    </p>
                    <p className="text-xs font-normal text-right">
                      Current Date: {currentDate.toDateString()}
                    </p>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  {reservationData.hotel_reservation.reservation_status ==
                    "Confirmed" && (
                    <Button
                      className="bg-gradient-to-r from-sky-500 to-sky-700 text-white flex flex-row gap-2 items-center"
                      onPress={() => {
                        handleCheckIn(
                          reservationData.hotel_reservation.reservation_key
                        );
                      }}
                    >
                      Check-In
                      <Spinner
                        color="white"
                        size="sm"
                        className={isLoading ? "" : "hidden"}
                      />
                    </Button>
                  )}
                </ModalFooter>
              </>
            );
          }}
        </ModalContent>
      </Modal>
      <Modal
        isOpen={successModal.isOpen}
        onOpenChange={successModal.onOpenChange}
        onClose={() => {
          detailsModal.onClose();
          setScanData(undefined);
          setReservationData(null);
          setIsPaused(false);
        }}
      >
        <ModalContent>
          {(onClose) => {
            return (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Check-In Success
                </ModalHeader>
                <ModalBody className="flex flex-col gap-4 items-center justify-center w-full">
                  <iframe
                    src={
                      "https://lottie.host/embed/db40c001-7105-4ce4-9eee-ae9928688a08/rRhddbiJyS.json"
                    }
                    className="size-60 mx-auto"
                  ></iframe>
                  <p className="uppercase font-bold">Success</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            );
          }}
        </ModalContent>
      </Modal>
      <Modal
        isOpen={failedModal.isOpen}
        onOpenChange={failedModal.onOpenChange}
        onClose={() => {
          detailsModal.onClose();
          setScanData(undefined);
          setReservationData(null);
          setIsPaused(false);
        }}
      >
        <ModalContent>
          {(onClose) => {
            return (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Check-In Failed
                </ModalHeader>
                <ModalBody className="flex flex-col gap-4 items-center justify-center w-full">
                  <iframe
                    src={
                      "https://lottie.host/embed/f6cd3132-663a-408b-8854-71a7305cf01b/gCTFmA9BgL.json"
                    }
                    className="size-60 mx-auto"
                  ></iframe>
                  <p className="uppercase font-bold">{errorMessage}</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            );
          }}
        </ModalContent>
      </Modal>
    </div>
  );
};
