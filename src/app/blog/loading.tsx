export default function BlogLoading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-4 border-neutral-200 dark:border-neutral-700 border-t-neutral-600 dark:border-t-neutral-300 rounded-full animate-spin" />
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Loading posts...
        </p>
      </div>
    </div>
  );
}
