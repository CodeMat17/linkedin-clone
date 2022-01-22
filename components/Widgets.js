import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import Image from "next/image";
import Link from "next/link";
import TimeAgo from "timeago-react";

function Widgets({ newsItems }) {
  return (
    <div className='hidden lg:inline space-y-2'>
      {/* News */}
      <div
        className='bg-white dark:bg-gray-700 py-2.5 
              rounded-lg space-y-2 w-11/12 overflow-hidden
              border border-gray-300 dark:border-none'>
        <div className='flex items-center justify-between font-bold px-2.5'>
          <h4>LinkedIn News</h4>
          <InfoRoundedIcon className='h-5 w-5' />
        </div>

        <div className='space-y-1'>
          {newsItems &&
            newsItems.map((news) => (
              <a key={news.url} href={news.url} target="_blank">
                  <div className='flex space-x-2 items-center cursor-pointer hover:bg-black/10 dark:hover:bg-black/20 px-2.5 py-1'>
                    <FiberManualRecordRoundedIcon className='!h-2 !w-2' />
                    <div>
                      <h5 className='max-w-xs font-medium text-sm truncate pr-10'>
                        {news.title}
                      </h5>
                      <TimeAgo
                        datetime={news.publishedAt}
                        className='text-xs mt-0.5 dark:text-white/75 opacity-80'
                      />
                    </div>
                  </div>
                </a>
            ))}
        </div>
      </div>
      {/* Ads */}
      <div className='sticky top-20'>
        <div className='relative w-11/12 h-64 rounded-lg overflow-hidden '>
          <Image
            src='https://rb.gy/kbfeaa'
            layout='fill'
            objectFit='cover'
            priority
          />
        </div>
      </div>
    </div>
  );
}
export default Widgets;
