"use client";

import React from "react";
import {
  centerText,
  IDetectedBarcode,
  Scanner,
} from "@yudiel/react-qr-scanner";

export const QRCodeReader = ({
  setResult,
  deviceId,
  isPaused,
}: Readonly<{
  setResult: React.Dispatch<IDetectedBarcode>;
  deviceId: string | null;
  isPaused: boolean;
}>) => {
  return (
    <div className="rounded-xl overflow-hidden">
      <Scanner
        key={deviceId}
        styles={{ container: { width: "480px", height: "480px" } }}
        allowMultiple={false}
        onScan={(result) => setResult(result[0])}
        constraints={{
          deviceId: { exact: deviceId || undefined },
          width: { ideal: 480 },
          height: { ideal: 480 },
        }}
        paused={isPaused}
        components={{
          audio: false,
          onOff: true,
          torch: true,
          zoom: true,
          finder: true,
          tracker: centerText,
        }}
        scanDelay={2000}
      />
    </div>
  );
};
