"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface PaginationButtonsProps {
  prevPageToken?: string;
  nextPageToken?: string;
}

export default function PaginationButtons({
  prevPageToken,
  nextPageToken,
}: PaginationButtonsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (pageToken: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("pageToken", pageToken);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex justify-center space-x-4">
      {prevPageToken && (
        <button
          onClick={() => handlePageChange(prevPageToken)}
          className="px-4 py-2 bg-[#272727] text-white rounded hover:bg-[#3f3f3f] transition-colors"
        >
          Previous
        </button>
      )}
      {nextPageToken && (
        <button
          onClick={() => handlePageChange(nextPageToken)}
          className="px-4 py-2 bg-[#272727] text-white rounded hover:bg-[#3f3f3f] transition-colors"
        >
          Next
        </button>
      )}
    </div>
  );
}
