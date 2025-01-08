import { cn } from "@/lib/utils";
import { BaseContainer } from "../BaseContainer";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

interface HotelRoomPhoto {
  url: string;
}

interface HotelRoom {
  type: string;
  max_visitor: number;
  bed_type: string;
  room_size: number;
  smoking_allowed: boolean;
  overnight_price: number;
  total_room: number;
  total_booked: 0;
  hotel_room_photos: HotelRoomPhoto[];
}

export const HotelRegister = () => {
  const [roomData, setRoomData] = useState<HotelRoom[]>([]);

  const handleAddRoom = () => {
    setRoomData([
      ...roomData,
      {
        type: "",
        max_visitor: 2,
        bed_type: "",
        room_size: 20,
        smoking_allowed: false,
        overnight_price: 0,
        total_room: 10,
        total_booked: 0,
        hotel_room_photos: [
          {
            url: "",
          },
        ],
      },
    ]);
  };

  const handleDeleteRoom = (index: number) => {
    setRoomData((prevRoomData) => prevRoomData.filter((_, i) => i !== index));
  };

  const handleRoomChange = (index: number, name: string, value: any) => {
    const updatedRoomData = [...roomData];
    updatedRoomData[index] = {
      ...updatedRoomData[index],
      [name]: value,
    };
    setRoomData(updatedRoomData);
  };

  return (
    <form className="flex flex-row gap-4">
      <div className="h-max">
        <BaseContainer
          title="Hotel Register"
          description="Sign up your hotel here"
        >
          <LabelInputContainer className="mb-4">
            <Label htmlFor="name">Hotel Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="The Apurva Kempinski Depok"
              type="text"
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="The Apurva Kempinski Depok is a resort..."
            />
          </LabelInputContainer>
          <div className="w-full flex flex-row gap-4">
            <LabelInputContainer className="mb-4">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                placeholder="Indonesia"
                type="text"
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                name="state"
                placeholder="West Java"
                type="text"
              />
            </LabelInputContainer>
          </div>
          <div className="w-full flex flex-row gap-4">
            <LabelInputContainer className="mb-4">
              <Label htmlFor="city">City</Label>
              <Input id="city" name="city" placeholder="Depok" type="text" />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="zip_code">Zip Code</Label>
              <Input
                id="zip_code"
                name="zip_code"
                placeholder="17825"
                type="number"
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="gmaps">Maps URL</Label>
            <Input
              id="gmaps"
              name="gmaps"
              placeholder="https://maps.app.goo.gl/..."
              type="text"
            />
          </LabelInputContainer>
        </BaseContainer>
      </div>
      <div className="h-max flex flex-col ">
        <div className="">
          {roomData.map((item, index) => {
            return (
              <BaseContainer
                key={index}
                title={`${item.type} Room`}
                className="mb-4"
              >
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="type">Type Name</Label>
                  <Input
                    id="type"
                    name="type"
                    placeholder="Deluxe Queen"
                    type="text"
                    value={item.type}
                    onChange={(e) =>
                      handleRoomChange(index, "type", e.target.value)
                    }
                  />
                </LabelInputContainer>
                <div className="w-full flex flex-row gap-4">
                  <LabelInputContainer className="mb-4">
                    <Label htmlFor="bed_type">Bed Type</Label>
                    <Input
                      id="bed_type"
                      name="bed_type"
                      placeholder="Queen"
                      type="text"
                      value={item.bed_type}
                      onChange={(e) =>
                        handleRoomChange(index, "bed_type", e.target.value)
                      }
                    />
                  </LabelInputContainer>
                  <LabelInputContainer className="mb-4">
                    <Label htmlFor="max_visitor">Max Visitor</Label>
                    <Input
                      id="max_visitor"
                      name="max_visitor"
                      placeholder="1"
                      type="number"
                      value={item.max_visitor}
                      onChange={(e) =>
                        handleRoomChange(index, "max_visitor", e.target.value)
                      }
                    />
                  </LabelInputContainer>
                </div>
                <div className="w-full flex flex-row gap-4">
                  <LabelInputContainer className="mb-4">
                    <Label htmlFor="room_size">
                      Room Size (m<sup>2</sup>)
                    </Label>
                    <Input
                      id="room_size"
                      name="room_size"
                      placeholder="0"
                      type="number"
                      value={item.room_size}
                      onChange={(e) =>
                        handleRoomChange(index, "room_size", e.target.value)
                      }
                    />
                  </LabelInputContainer>
                  <LabelInputContainer className="mb-4">
                    <Label htmlFor="smoking_allowed">Smoking Allowed</Label>
                    <Select
                      value={item.smoking_allowed.toString()}
                      onValueChange={(e) =>
                        handleRoomChange(index, "smoking_allowed", e)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="No" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="false">No</SelectItem>
                        <SelectItem value="true">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  </LabelInputContainer>
                </div>
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="total_room">Total Room Available</Label>
                  <Input
                    id="total_room"
                    name="total_room"
                    placeholder="0"
                    type="number"
                    value={item.total_room}
                    onChange={(e) =>
                      handleRoomChange(index, "total_room", e.target.value)
                    }
                  />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="overnight_price">Overnight Price (Rp)</Label>
                  <Input
                    id="overnight_price"
                    name="overnight_price"
                    placeholder="0"
                    type="number"
                    value={item.overnight_price}
                    onChange={(e) =>
                      handleRoomChange(index, "overnight_price", e.target.value)
                    }
                  />
                </LabelInputContainer>
                <div className="flex flex-row justify-end pt-3">
                  <Button
                    onClick={() => handleDeleteRoom(index)}
                    color="danger"
                    variant="ghost"
                    size="sm"
                  >
                    Delete
                  </Button>
                </div>
              </BaseContainer>
            );
          })}
        </div>
        <div className="flex w-full">
          <BaseContainer className="w-max">
            <div className="flex justify-end items-center w-full gap-4">
              <p>Add Room</p>
              <Button
                onClick={handleAddRoom}
                size="sm"
                className="bg-gradient-to-r from-sky-500 to-sky-700 text-white font-bold"
                isIconOnly
              >
                +
              </Button>
            </div>
          </BaseContainer>
        </div>
      </div>
    </form>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className: string;
}>) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
