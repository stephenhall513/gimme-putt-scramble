"use client";
import { Scorecard } from "@/types/Scorecard";
import { Card, CardContent } from "@mui/material";

interface ScorecardProps {
  scorecard: Scorecard;
}

const ScrambleScorecard = ({ scorecard }: ScorecardProps) => {
  return scorecard ? (
    <table className="w-max border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 p-2"></th>
          {scorecard?.front9Scores.map((scorecard) => (
            <th
              key={scorecard.hole?.id}
              className="border border-gray-300 p-2 text-center"
            >
              {scorecard.hole?.holeNumber}
            </th>
          ))}
          <th className="border border-gray-300 p-2 text-center">Front</th>
          {scorecard?.back9Scores.map((scorecard) => (
            <th
              key={scorecard.hole?.id}
              className="border border-gray-300 p-2 text-center"
            >
              {scorecard.hole?.holeNumber}
            </th>
          ))}
          <th className="border border-gray-300 p-2 text-center">Back</th>
          <th className="border border-gray-300 p-2 text-center">Total</th>
          <th className="border border-gray-300 p-2 text-center"></th>
        </tr>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 p-2"></th>
          {scorecard?.front9Scores.map((scorecard) => (
            <th
              key={scorecard.hole?.id}
              className="border border-gray-300 p-2 text-center"
            >
              {scorecard.hole?.par}
            </th>
          ))}
          <th className="border border-gray-300 p-2 text-center">
            {scorecard.front9Par}
          </th>
          {scorecard?.back9Scores.map((scorecard) => (
            <th
              key={scorecard.hole?.id}
              className="border border-gray-300 p-2 text-center"
            >
              {scorecard.hole?.par}
            </th>
          ))}
          <th className="border border-gray-300 p-2 text-center">
            {scorecard.back9Par}
          </th>
          <th className="border border-gray-300 p-2 text-center">
            {scorecard.totalPar}
          </th>
          <th className="border border-gray-300 p-2 text-center"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border border-gray-300 p-2 font-bold">
            {scorecard?.teamName}
          </td>
          {scorecard?.front9Scores.map((scorecard) => (
            <td
              key={scorecard.scrambleScoreId}
              className="border border-gray-300 p-2 text-center"
            >
              {scorecard.strokes}
            </td>
          ))}
          <td className="border border-gray-300 p-2 text-center font-bold">
            {scorecard?.front9Score}
          </td>
          {scorecard?.back9Scores.map((scorecard) => (
            <td
              key={scorecard.scrambleScoreId}
              className="border border-gray-300 p-2 text-center"
            >
              {scorecard.strokes}
            </td>
          ))}
          <td className="border border-gray-300 p-2 text-center font-bold">
            {scorecard?.back9Score}
          </td>
          <td className="border border-gray-300 p-2 text-center font-bold">
            {scorecard?.totalScore}
          </td>
          <td className="border border-gray-300 p-2 text-center font-bold">
            {scorecard?.overUnderScore == 0
              ? "E"
              : scorecard?.overUnderScore > 0
                ? "+" + scorecard?.overUnderScore
                : scorecard?.overUnderScore}
          </td>
        </tr>
      </tbody>
    </table>
  ) : (
    false
  );
};

export default ScrambleScorecard;
