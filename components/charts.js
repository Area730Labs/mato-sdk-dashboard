import React from "react";
import Chart from "chart.js";
import { 
  SimpleGrid,
  Box,
  Divider,
  VStack,
  StackDivider,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Text,
  StatGroup,
} from '@chakra-ui/react'
import Image from 'next/image'
import { useWallet } from '@solana/wallet-adapter-react';




export default function Charts() {
    const { publicKey } = useWallet();


    React.useEffect(() => {
        var config = {
          type: "line",
          data: {
            labels: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
            ],
            datasets: [
              {
                label: new Date().getFullYear(),
                backgroundColor: "#3182ce",
                borderColor: "#3182ce",
                data: [65, 78, 66, 44, 56, 67, 75],
                fill: false,
              },
              {
                label: new Date().getFullYear() - 1,
                fill: false,
                backgroundColor: "#edf2f7",
                borderColor: "#edf2f7",
                data: [40, 68, 86, 74, 56, 60, 87],
              },
            ],
          },
          options: {
            maintainAspectRatio: false,
            responsive: true,
            title: {
              display: false,
              text: "Sales Charts",
              fontColor: "white",
            },
            legend: {
              labels: {
                fontColor: "white",
              },
              align: "end",
              position: "bottom",
            },
            tooltips: {
              mode: "index",
              intersect: false,
            },
            hover: {
              mode: "nearest",
              intersect: true,
            },
            scales: {
              xAxes: [
                {
                  ticks: {
                    fontColor: "rgba(255,255,255,.7)",
                  },
                  display: true,
                  scaleLabel: {
                    display: false,
                    labelString: "Month",
                    fontColor: "white",
                  },
                  gridLines: {
                    display: false,
                    borderDash: [2],
                    borderDashOffset: [2],
                    color: "rgba(33, 37, 41, 0.3)",
                    zeroLineColor: "rgba(0, 0, 0, 0)",
                    zeroLineBorderDash: [2],
                    zeroLineBorderDashOffset: [2],
                  },
                },
              ],
              yAxes: [
                {
                  ticks: {
                    fontColor: "rgba(255,255,255,.7)",
                  },
                  display: true,
                  scaleLabel: {
                    display: false,
                    labelString: "Value",
                    fontColor: "white",
                  },
                  gridLines: {
                    borderDash: [3],
                    borderDashOffset: [3],
                    drawBorder: false,
                    color: "rgba(255, 255, 255, 0.15)",
                    zeroLineColor: "rgba(33, 37, 41, 0)",
                    zeroLineBorderDash: [2],
                    zeroLineBorderDashOffset: [2],
                  },
                },
              ],
            },
          },
        };
        var ctx = document.getElementById("line-chart").getContext("2d");
        window.myLine = new Chart(ctx, config);

        var ctx2 = document.getElementById("line-chart-2").getContext("2d");
        window.myLine2 = new Chart(ctx2, config);
      }, []);

    return (
        <>
            <p className="not-italic text-center text-xl font-bold m-2.5 mt-4">Game stats</p>

            <VStack
              divider={<StackDivider borderColor='gray.200' />}
              spacing={4}
              align='stretch'
              padding={5}
            >
              <HStack>
                <a href="#">
                  <Image src="/copyIcon.svg" alt="Logo" className="mr-3 h-6 sm:h-7" width={22} height={22} color='gray.100'/>
                </a>
                <Text fontSize='s' fontWeight='bold'>Project ID:</Text>
                <Text fontSize='s'>{publicKey.toString()}</Text>
              </HStack>


              <SimpleGrid columns={2} spacingX='40px' spacingY='20px'>
                <Box border='1px' borderColor='gray.100' padding={4} borderRadius={11} >
                  <Stat>
                    <StatLabel>Revenue (all time)</StatLabel>
                    <StatNumber>USDC 345,670</StatNumber>
                    <StatHelpText>Per user: USDC 155</StatHelpText>
                  </Stat>
                </Box>

                <Box border='1px' borderColor='gray.100' padding={4} borderRadius={11}>
                  <Stat>
                    <StatLabel>Revenue (last 30 days)</StatLabel>
                    <StatNumber>USDC 15,990</StatNumber>
                    <StatHelpText>
                      <StatArrow type='increase' />
                      23.36%
                    </StatHelpText>
                  </Stat>
                </Box>

               
                
              </SimpleGrid>

              
            </VStack>


            <div className="relative flex flex-col  break-words m-4 border-b border-gray-200 bg-blueGray-700 p-2">
                <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                    <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                        Revenue
                    </h6>
                    <h2 className="text-white text-xl font-semibold">Sales value</h2>
                    </div>
                </div>
                </div>
                <div className="p-4 flex-auto">
                {/* Chart */}
                <div className="relative h-350-px">
                    <canvas id="line-chart"></canvas>
                </div>
                </div>
            </div>

            <div className="relative flex flex-col  break-words m-4 border-b border-gray-200 bg-blueGray-700 p-2">
                <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                    <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                        Sales
                    </h6>
                    <h2 className="text-white text-xl font-semibold">Sales value</h2>
                    </div>
                </div>
                </div>
                <div className="p-4 flex-auto">
                {/* Chart */}
                <div className="relative h-350-px">
                    <canvas id="line-chart-2"></canvas>
                </div>
                </div>
            </div>
        </>
    );
}