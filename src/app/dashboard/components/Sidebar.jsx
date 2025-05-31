"use client";

import * as React from "react"
import {
    PlusCircle,
    FileText,
    Library,
    MessageSquare,
    Gift,
    Video,
    HelpCircle,
    Keyboard,
    Monitor,
    Sun,
    Moon,
    Zap,
    LogOut
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarFooter,
    SidebarSeparator,
    SidebarTrigger
} from "@/components/ui/sidebar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUIStore } from "@/stores/uiStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SidebarComponent() {
    const [uploadProgress, setUploadProgress] = React.useState(10);
    const [userName, setUserName] = React.useState("");
    const [userEmail, setUserEmail] = React.useState("");
    const openLibrarySidebar = useUIStore((state) => state.openLibrarySidebar);
    const openDocumentsSidebar = useUIStore((state) => state.openDocumentsSidebar);
    const toggleChatSidebar = useUIStore((state) => state.toggleChatSidebar);
    const router = useRouter();

    // Obtener información del usuario al cargar
    React.useEffect(() => {
        if (typeof window !== "undefined") {
            const storedUserName = localStorage.getItem("userName") || "";
            const storedUserEmail = localStorage.getItem("userEmail") || "";
            setUserName(storedUserName);
            setUserEmail(storedUserEmail);
        }
    }, []);

    // Función para manejar el logout
    const handleLogout = () => {
        // Limpiar localStorage
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userName");
        localStorage.removeItem("libraryFolderStructure"); // Limpiar carpetas de la librería

        // Mostrar mensaje de confirmación
        toast.success("Sesión cerrada correctamente");

        // Redirigir al login
        router.push("/sign-in");
    };

    // Generar iniciales del nombre
    const getInitials = (name) => {
        if (!name) return "U";
        return name
            .split(" ")
            .map(word => word.charAt(0))
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <Sidebar className="border-r border-gray-200 bg-white w-[180px] shadow-sm overflow-hidden">
            <SidebarTrigger className="absolute top-2 right-2" />
            <SidebarHeader className="p-2 flex items-center gap-2 border-b border-gray-100">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-md p-1 transition-colors">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/avatar.png" />
                                <AvatarFallback className="bg-gray-100 text-gray-800 text-sm">
                                    {getInitials(userName)}
                                </AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-gray-900 text-sm">
                                {userName || "Usuario"}
                            </span>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48">
                        <DropdownMenuItem className="text-xs text-gray-500" disabled>
                            {userEmail}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={handleLogout}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                            <LogOut className="h-4 w-4 mr-2" />
                            Cerrar Sesión
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarHeader>

            <SidebarContent className="py-2">
                <SidebarMenu className="sidebar-menu">
                    <SidebarMenuItem>
                        <SidebarMenuButton className="w-full px-2 py-2 justify-start gap-2 hover:bg-gray-50 text-sm">
                            <PlusCircle className="h-4 w-4 text-indigo-600" />
                            <span className="text-indigo-600 font-medium">New</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton
                            data-tour="documents-button"
                            className="w-full px-2 py-2 justify-start gap-2 hover:bg-gray-50 text-sm documents-button"
                            onClick={openDocumentsSidebar}
                        >
                            <FileText className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-700">Documents</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton
                            data-tour="library-button"
                            className="w-full px-2 py-2 justify-start gap-2 hover:bg-gray-50 text-sm library-button"
                            onClick={openLibrarySidebar}
                        >
                            <Library className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-700">Library</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton
                            data-tour="chat-button"
                            className="w-full px-2 py-2 justify-start gap-2 hover:bg-gray-50 text-sm chat-button"
                            onClick={toggleChatSidebar}
                        >
                            <MessageSquare className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-700">AI Chat</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    );
}
