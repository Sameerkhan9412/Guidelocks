import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";
// import Topbar from "@/components/admin/Topbar";


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Topbar />

        <main className="p-6">
          {children}
        </main>

      </div>

    </div>
  );
}