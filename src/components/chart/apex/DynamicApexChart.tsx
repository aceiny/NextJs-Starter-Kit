"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

// Dynamically import react-apexcharts only on the client to avoid window/document access during SSR
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false }) as ComponentType<any>;

export default ReactApexChart;
