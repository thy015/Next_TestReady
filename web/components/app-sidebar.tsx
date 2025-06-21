'use client'

import * as React from 'react'
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Component,
  GalleryVerticalEnd,
  Heart,
  LibraryBig,
  Shapes,
  StepForward,
} from 'lucide-react'

import { NavMain } from '@/components/nav-main'
import { NavUser } from '@/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { NavPersonal } from './nav-personal'

// This is sample data.
const data = {
  user: {
    name: 'username',
    email: 'username@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Phân bổ đề thi',
      url: '#',
      icon: Shapes,
      isActive: true,
      items: [
        {
          title: 'Listening',
          url: '#',
        },
        {
          title: 'Reading',
          url: '#',
        },
      ],
    },
    {
      title: 'Xác định lộ trình',
      url: '#',
      icon: Bot,
      items: [
        {
          title: 'Test đầu vào',
          url: '#',
        },
        {
          title: 'Bắt đầu từ đâu',
          url: '#',
        },
      ],
    },
    {
      title: 'Tài liệu',
      url: '#',
      icon: LibraryBig,
      items: [
        {
          title: 'Tài liệu tự học',
          url: '#',
        },
        {
          title: 'Luyện đề',
          url: '#',
        },
        {
          title: 'Tips luyện đề',
          url: '#',
        },
      ],
    },
    {
      title: 'Khóa học',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'TOEIC Vỡ lòng',
          url: '#',
        },
        {
          title: '450-550+',
          url: '#',
        },
        {
          title: '600-650+',
          url: '#',
        },
        {
          title: '750-850+',
          url: '#',
        },
        {
          title: '900+',
          url: '#',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Từ vựng của tôi',
      url: '#',
      icon: Heart,
    },
    {
      name: 'Lộ trình của tôi',
      url: '#',
      icon: StepForward,
    },
    {
      name: 'Nhóm Flashcard',
      url: '#',
      icon: Component,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="z-20" variant="inset" collapsible="icon" {...props}>
      <SidebarHeader className="flex flex-row items-center mt-5">
        <SidebarTrigger />
        <SidebarGroup>
          <SidebarGroupLabel className="text-white font-mogra mt-2 text-2xl flex relative">
            <div className="absolute inset-0 text-light-blue select-none transform translate-x-1.5 translate-y-0.5">
              TEST Ready
            </div>
            <div className="relative text-white">TEST Ready</div>
          </SidebarGroupLabel>
        </SidebarGroup>
      </SidebarHeader>
      <SidebarContent>
        <div className="h-36"></div>
        <NavMain items={data.navMain} />
        <NavPersonal projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
