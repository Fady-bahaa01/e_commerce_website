import Skeleton from "../components/Skeleton";

export default function HeroSkeleton() {
  return (
    <div className="w-82 h-80 md:w-94.75 md:h-86.5 flex flex-col justify-center">
      <Skeleton className="w-28 h-3" />

      <Skeleton className="w-72 h-12 mt-6" />

      <Skeleton className="w-60 h-12 mt-2" />

      <Skeleton className="w-full h-4 mt-6" />

      <Skeleton className="w-11/12 h-4 mt-2" />

      <Skeleton className="w-40 h-12 mt-10 rounded-none" />
    </div>
  );
}
