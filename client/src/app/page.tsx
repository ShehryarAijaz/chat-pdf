import FileUpload from "@/app/components/FileUpload";

export default function Home() {
  return (
    <div>
      <div className="flex min-h-screen min-w-screen">
        <div className="w-[25vw] min-h-screen"><FileUpload /></div>
        <div className="w-[75vw] min-h-screen border-l-2">2</div>
      </div>
    </div>
  );
}
