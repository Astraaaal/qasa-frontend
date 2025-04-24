import React from "react";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Filter, Download, RefreshCw } from "lucide-react";

interface RefreshButtonProps {
  onViewReport?: () => void;
  onRefresh?: () => void;
  showPost?: boolean;
  showFilter?: boolean;
  showExport?: boolean;
  showRefresh?: boolean;
}

const RefreshButton = ({
  onViewReport = () => console.log("View detailed report clicked"),
  onRefresh = () => console.log("Refresh clicked"),
  showRefresh = true,
}: RefreshButtonProps) => {
  return (
    <div>
      {/*<div className="flex items-center gap-3">
        <Button
          variant="default"
          className="bg-[#0078D7] hover:bg-[#1C61A1] text-white"
          onClick={onViewReport}
        >
          <FileText className="w-4 h-4 mr-2" />
          View Detailed Report
        </Button>

      </div>*/}

      <div>
        {showRefresh && (
          <Button
            variant="ghost"
            size="sm"
            className="text-[#20476E] hover:bg-[#F0F0F0] hover:text-[#0078D7]"
            onClick={onRefresh}
          >
            <RefreshCw className="w-4 h-4 mr-1" />
            Refresh
          </Button>
        )}
      </div>
    </div>
  );
};

export default RefreshButton;
