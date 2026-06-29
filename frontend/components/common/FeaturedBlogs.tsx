
'use client'

import { useState, useEffect } from "react";
import { getAllBlogs, generateSlug } from "@/services/blogServices";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

export default function FeaturedBlogs() {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isResourcesPage = pathname === "/resources";

  const [featuredBlog, setFeaturedBlog] = useState<any>();
  const [recentBlogs, setRecentBlogs] = useState<any[]>();

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const data = await getAllBlogs();
        if (data && data.length > 0) {
          const featured = data.filter((b: any) => b.isFeatured);
          const baseUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || "").replace("/api/v1", "");

          if (featured.length > 0) {
            const first = featured[0];
            setFeaturedBlog({
              id: first._id,
              title: first.title,
              category: first.category || "Uncategorized",
              readTime: first.readTime || "5 min",
              image: first.image?.startsWith("http") ? first.image : `${baseUrl}${first.image}`,
            });

            const rest = featured.slice(1, 6).map((b: any) => ({
              id: b._id,
              title: b.title,
              category: b.category || "Uncategorized",
              image: b.image?.startsWith("http") ? b.image : `${baseUrl}${b.image}`,
            }));
            setRecentBlogs(rest);
          }
        }
      } catch (error) {
        console.error("Error fetching featured blogs", error);
      }
    }
    fetchBlogs();
  }, []);

  if (!featuredBlog || !recentBlogs) {
    return null;
  }

  return (
    <section className="py-6 lg:py-2 w-full max-w-[97vw] mx-auto relative">
      <div className="bg-[#CDC2BB] mx-auto py-6 lg:py-16 px-4 md:px-8 lg:px-16 rounded-xl ">

        {/* Section Header */}
        <div className={`flex flex-col ${isResourcesPage ? 'md:items-start items-center  ml-4 ' : 'items-center'}  lx:items-start mb-12`}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans font-semibold  text-2xl  md:text-[36px] leading-none tracking-normal text-[#1D2331] inline-block relative mb-2"
          >
            Featured Blog Posts
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
              className="absolute -bottom-3 left-0 w-[100%] origin-left"
            >
              <div className="w-full h-[2.5px] bg-[#ED3D3D] mb-[1px]"></div>
              <div className="w-full h-[2.5px] bg-[#ED3D3D]"></div>
            </motion.div>
          </motion.h2>
        </div>

        {/* Blog Grid */}
        <div className="flex flex-col xl:flex-row gap-8 xl:gap-12 mt-8 items-stretch">

          {/* Left: Featured Blog */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => router.push(`/resources/${generateSlug(featuredBlog.title)}`)}
            className="relative w-full xl:w-[654px] h-[320px] sm:h-[450px] xl:h-[607px] cursor-pointer flex-shrink-0 select-none"
          >
            {/* Image Container (shrinks and shifts to top-right on hover) */}
            <motion.div
              animate={{
                width: isHovered ? "88%" : "100%",
                height: isHovered ? "88%" : "100%",
                boxShadow: isHovered
                  ? "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                  : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              className="absolute right-0 top-0 rounded-[30px] overflow-hidden flex-shrink-0"
            >
              <motion.div
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={featuredBlog.image || ""}
                  alt={featuredBlog.title}
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Gradient Overlay (placed inside image container to match its bounds) */}
              <motion.div
                animate={{ opacity: isHovered ? 0 : 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/40 to-transparent pointer-events-none"
              />
            </motion.div>

            {/* Content Container / Text Card (shifts left-down and turns beige with rounded corners on hover, size remains constant) */}
            <motion.div
              animate={{
                backgroundColor: isHovered ? "rgb(229, 222, 219)" : "rgba(229, 222, 219, 0)", // #E5DEDB
                borderRadius: isHovered ? "24px" : "0px",
                boxShadow: isHovered
                  ? "0 20px 25px -5px rgba(0, 0, 0, 0.12), 0 10px 10px -5px rgba(0, 0, 0, 0.06)"
                  : "none",
                x: isHovered ? "-12px" : "0px",
                y: isHovered ? "12px" : "0px"
              }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              className="absolute bottom-0 left-0 w-[92%] sm:w-[85%] lg:w-[80%] p-6 sm:p-8 md:p-12 flex flex-col justify-end z-10"
            >
              <h3 className="font-sans font-medium text-[#1D2331] text-[18px] sm:text-[24px] lg:text-[26px] leading-none tracking-normal mb-3 sm:mb-4 max-w-[95%] sm:max-w-[90%] transition-colors duration-300">
                {featuredBlog.title}
              </h3>
              <div className="flex flex-col gap-1.5 sm:gap-2 font-mono font-medium text-[13px] sm:text-[16px] lg:text-[18px] leading-none tracking-normal text-[#1D2331]/80">
                <span>CATEGORY: <span className="font-mono  uppercase">{featuredBlog.category}</span></span>
                <span>READ: <span className="font-mono  lowercase">{featuredBlog.readTime}</span></span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Small Blogs List */}
          <div className="flex flex-col gap-4 lg:gap-0 lg:justify-between flex-1 mt-6 lg:mt-0">
            {recentBlogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                onClick={() => router.push(`/resources/${generateSlug(blog.title)}`)}
                className="flex gap-4 sm:gap-5 items-center group cursor-pointer p-3 sm:p-4 rounded-[20px] sm:rounded-[24px] bg-transparent hover:bg-[#E5DEDB] hover:shadow-md transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
              >
                <div className="relative w-[110px] sm:w-[150px] lg:w-[13.0889644623rem] h-[62px] sm:h-[84px] lg:h-[7.3054690361rem] rounded-[12px] sm:rounded-[16px] overflow-hidden shadow-sm flex-shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[0.9]">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center pr-2 sm:pr-4">
                  <h4 className="font-sans font-medium text-[#1D2331] text-[14px] sm:text-[18px] lg:text-[20px] leading-snug tracking-normal mb-1.5 sm:mb-2 group-hover:text-[#ED3D3D] transition-colors duration-300">
                    {blog.title}
                  </h4>
                  <span className="font-mono font-medium text-[11px] sm:text-[14px] lg:text-[18px] leading-none tracking-normal text-[#00000070] uppercase">
                    {blog.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
