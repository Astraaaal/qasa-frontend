import React from "react";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Filter, Download, RefreshCw } from "lucide-react";

interface ActionButtonsProps {
  onViewReport?: () => void;
  onPost?: () => void;
  onFilter?: () => void;
  onExport?: () => void;
  onRefresh?: () => void;
  showPost?: boolean;
  showFilter?: boolean;
  showExport?: boolean;
  showRefresh?: boolean;
}

const ActionButtons = ({
  onViewReport = () => console.log("View detailed report clicked"),
  onPost = () => console.log("Post clicked"),
  onFilter = () => console.log("Filter clicked"),
  onExport = () => console.log("Export clicked"),
  onRefresh = () => console.log("Refresh clicked"),
  showPost = true,
  showFilter = true,
  showExport = true,
  showRefresh = true,
}: ActionButtonsProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white rounded-md shadow-sm">
      <div className="flex items-center gap-3">
        <Button
          variant="default"
          className="bg-[#0078D7] hover:bg-[#1C61A1] text-white"
          onClick={onViewReport}
        >
          <FileText className="w-4 h-4 mr-2" />
          View Detailed Report
        </Button>

        {/*{showPost && (
          <Button
            variant="outline"
            className="border-[#0078D7] text-[#0078D7] hover:bg-[#F0F0F0] hover:text-[#1C61A1]"
            onClick={onPost}
          >
            <Upload className="w-4 h-4 mr-2" />
            Post
          </Button>
        )}*/}
      </div>

      <div className="flex items-center gap-2">
        {showFilter && (
          <Button
            variant="ghost"
            size="sm"
            className="text-[#20476E] hover:bg-[#F0F0F0] hover:text-[#0078D7]"
            onClick={onFilter}
          >
            <Filter className="w-4 h-4 mr-1" />
            Filter
          </Button>
        )}

        {showExport && (
          <Button
            variant="ghost"
            size="sm"
            className="text-[#20476E] hover:bg-[#F0F0F0] hover:text-[#0078D7]"
            onClick={onExport}
          >
            <Download className="w-4 h-4 mr-1" />
            Export
          </Button>
        )}

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

export default ActionButtons;
