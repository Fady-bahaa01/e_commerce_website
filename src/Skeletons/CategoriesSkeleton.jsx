import Skeleton from "../components/Skeleton";

export default function CategoriesSkeleton() {
  return (
    <div className="w-full grid md:grid-cols-3 grid-cols-1 md:gap-2.5 lg:gap-7.5 gap-17">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="
            w-full
            md:w-55.75
            h-41.25
            lg:w-87.5
            lg:h-51
            bg-Gray
            rounded-lg
            relative
            flex
            flex-col
            items-center
            shadow-md
          "
        >
          {/* images*/}
          <Skeleton
            className="
              absolute
              -top-8
              lg:-top-12
              w-24
              h-24
              lg:w-36
              lg:h-36
              rounded-full
            "
          />

          {/* product name */}
          <Skeleton
            className="
              mt-24
              lg:mt-32
              w-36
              h-5
            "
          />

          {/* shop */}
          <div className="flex items-center gap-3 mt-5">
            <Skeleton className="w-12 h-3" />

            <Skeleton className="w-2 h-3 rounded-sm" />
          </div>
        </div>
      ))}
    </div>
  );
}
