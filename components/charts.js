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
import { useProjectContext } from "./projectContext";
import { CopyIcon } from "@chakra-ui/icons";




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

  const { project } = useProjectContext();

  return (
    <>
      <VStack
        // divider={<StackDivider borderColor='gray.200' />}
        spacing={4}
        align='stretch'
        padding={5}
      >
        <HStack>
          <CopyIcon />
          <Text fontSize='s' fontWeight='bold'>Project </Text>
          <Text fontSize='s'>{project.toString()}</Text>
        </HStack>

        <SimpleGrid columns={3} spacing="2">
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

          <Box alignSelf="end" border='1px' borderColor='gray.100' padding={4} borderRadius={11}>
            <Stat>
              <StatLabel>Secondary market revenue</StatLabel>
              <StatNumber>USDC 509.90</StatNumber>
              <StatHelpText>
                <StatArrow type='decrease' />
                3.36%
              </StatHelpText>
            </Stat>
          </Box>
        </SimpleGrid>
      </VStack>

      <Box paddingLeft="5">
        <Box backgroundColor="rgb(243 244 246)" borderRadius="10px" p="4">
          <Text fontSize="sm">Revenue</Text>
          <div className="relative h-350-px">
            <canvas id="line-chart"></canvas>
          </div>
        </Box>
        <Box borderRadius="10px" p="4" >
          <Text fontSize="sm">Secondary market revenue</Text>
          <div className="relative h-350-px">
            <canvas id="line-chart-2"></canvas>
          </div>
        </Box>
      </Box>
    </>
  );
}