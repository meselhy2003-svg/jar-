import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export interface InstructorProfileData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  age: string;
  university: string;
  faculty: string;
  major: string;
  academicStatus: 'Student' | 'Graduate';
  subjects: string;
  walletBalanceSAR: number;
  walletBalanceEGP: number;
}

export interface NotificationItem {
  id: string;
  type: 'payment' | 'offer-accepted' | 'offer-submitted' | 'project-assigned' | 'verified';
  title: string;
  description: string;
  time: string;
  isNew?: boolean;
  read?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'instructor' | 'student' | 'system';
  text: string;
  time: string;
}

export interface OfferData {
  id: string;
  category: 'trial' | 'assignment' | 'explain-video' | 'explain-live';
  status: 'pending' | 'approved';
  studentName: string;
  initials?: string;
  subject: string;
  title?: string;
  description: string;
  deadline: string;
  filename?: string;
  pdfs?: string[];
  budget?: string;
  estimatedHours?: number;
  hourlyRate?: number;
  totalPrice?: number;
  postedAt?: string;
}

export interface ProjectData {
  id: string;
  category: 'assignment' | 'explain-video' | 'explain-live';
  studentName: string;
  initials: string;
  subject: string;
  title: string;
  description: string;
  deadline: string;
  budget: string;
  filename?: string;
  fileMeta?: string;
  materials?: { id: string; name: string }[];
  status: 'in-progress' | 'delivered';
  deliveredAt?: string;
  deliveredVideoName?: string;
  deliveredProjectName?: string;
}

interface InstructorContextType {
  profile: InstructorProfileData;
  updateProfile: (updated: Partial<InstructorProfileData>) => void;
  withdrawFunds: (amount: number, currency?: 'SAR' | 'EGP') => boolean;

  notifications: NotificationItem[];
  unreadCount: number;
  addNotification: (item: Omit<NotificationItem, 'id' | 'time'>) => void;
  markAllNotificationsRead: () => void;
  markNotificationRead: (id: string) => void;

  offers: OfferData[];
  submitNewOffer: (offer: Omit<OfferData, 'id' | 'status'>) => OfferData;
  approveOffer: (offerId: string) => void;

  projects: ProjectData[];
  deliverProject: (projectId: string, payload: { videoName?: string; projectName?: string }) => void;

  chats: Record<string, ChatMessage[]>;
  sendChatMessage: (chatKey: string, text: string, sender?: 'instructor' | 'student') => void;
}

const DEFAULT_PROFILE: InstructorProfileData = {
  fullName: 'Ahmed Mohamed',
  email: 'ahmed@email.com',
  phone: '+966 50 123 4567',
  country: 'Saudi Arabia',
  age: '32',
  university: 'King Saud University',
  faculty: 'College of Computer and Information Sciences',
  major: 'Computer Science',
  academicStatus: 'Graduate',
  subjects: 'Data Structures, Algorithms, Software Engineering',
  walletBalanceSAR: 200,
  walletBalanceEGP: 1500,
};

const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    type: 'payment',
    title: 'Payment Added',
    description: '600 EGP has been added to your wallet.',
    time: '2 min ago',
    isNew: true,
    read: false,
  },
  {
    id: 'n2',
    type: 'offer-accepted',
    title: 'Offer Accepted',
    description: 'Your offer has been accepted by the student and payment has been added to your wallet.',
    time: '1 hour ago',
    read: false,
  },
  {
    id: 'n3',
    type: 'offer-submitted',
    title: 'Offer Submitted',
    description: 'Your offer has been successfully submitted.',
    time: '4 hours ago',
    read: true,
  },
  {
    id: 'n4',
    type: 'project-assigned',
    title: 'Project Assigned',
    description: 'Your offer has been converted into a project and added to My Projects.',
    time: 'Yesterday',
    read: true,
  },
  {
    id: 'n5',
    type: 'verified',
    title: 'Identity Verified',
    description: 'Your credentials have been successfully reviewed. You can now accept premium tasks.',
    time: '3 days ago',
    read: true,
  },
];

const DEFAULT_OFFERS: OfferData[] = [
  // Trial offers
  {
    id: 't1',
    category: 'trial',
    status: 'pending',
    studentName: 'A.Amr',
    subject: 'Data Structures',
    description: 'Need help understanding linked lists and basic implementation. Specifically focusing on doubly linked lists and memory management in C++.',
    deadline: '25 March 2026',
    filename: 'trial_task_data_structures.pdf',
  },
  {
    id: 't2',
    category: 'trial',
    status: 'approved',
    studentName: 'S.Ahmed',
    subject: 'Software Architecture',
    description: 'Reviewing microservices architecture patterns and event-driven systems. Need a deep dive into Kafka versus RabbitMQ implementations.',
    deadline: '28 March 2026',
    filename: 'architecture_review_draft.pdf',
  },
  // Explain Video offers
  {
    id: 'ev1',
    category: 'explain-video',
    status: 'pending',
    initials: 'OM',
    studentName: 'O.Mohamed',
    postedAt: 'Posted 2h ago',
    title: 'Need explanation for recursion and trees.',
    subject: 'Computer Science',
    description: 'Need clear video explanation for tree traversal algorithms.',
    pdfs: ['PDF 1', 'PDF 2', 'PDF 3'],
    deadline: '30 March 2026',
  },
  {
    id: 'ev2',
    category: 'explain-video',
    status: 'approved',
    initials: 'AS',
    studentName: 'A.Saeed',
    postedAt: 'Posted 5h ago',
    title: 'Object Oriented Programming (Java) session.',
    subject: 'Java Programming',
    description: 'Comprehensive walkthrough of OOP concepts in Java.',
    pdfs: ['PDF 1', 'PDF 2', 'PDF 3'],
    deadline: '2 April 2026',
  },
  // Explain Live offers
  {
    id: 'el1',
    category: 'explain-live',
    status: 'pending',
    studentName: 'A.Amr',
    subject: 'Data Structures',
    description: 'Need help understanding linked lists and basic implementation. Specifically focusing on doubly linked lists and memory management in C++.',
    filename: 'trial_task_data_structures.pdf',
    deadline: '25 March 2026',
  },
  {
    id: 'el2',
    category: 'explain-live',
    status: 'approved',
    studentName: 'S.Ahmed',
    subject: 'Software Architecture',
    description: 'Reviewing microservices architecture patterns and event-driven systems. Need a deep dive into Kafka versus RabbitMQ implementations.',
    filename: 'architecture_review_draft.pdf',
    deadline: '28 March 2026',
  },
];

const DEFAULT_PROJECTS: ProjectData[] = [
  {
    id: 'p-asg-1',
    category: 'assignment',
    studentName: 'O.Mohamed',
    initials: 'OM',
    subject: 'Database Systems',
    title: 'Database Normalization & SQL Queries',
    description: 'Need help completing SQL queries and normalization tasks for a university project.',
    budget: '600 EGP',
    deadline: '28 March 2026',
    filename: 'assignment.pdf',
    fileMeta: 'PDF Document • 2.4 MB',
    status: 'in-progress',
  },
  {
    id: 'p-asg-2',
    category: 'assignment',
    studentName: 'S.Ahmed',
    initials: 'SA',
    subject: 'Data Structures',
    title: 'Balanced Binary Search Trees & Graphs',
    description: 'Implementation of balanced binary search trees and complex graph traversal algorithms.',
    budget: '750 EGP',
    deadline: '15 April 2026',
    filename: 'project_spec.pdf',
    fileMeta: 'PDF Document • 3.7 MB',
    status: 'in-progress',
  },
  {
    id: 'p-exp-1',
    category: 'explain-video',
    studentName: 'O.Mohamed',
    initials: 'OM',
    subject: 'Computer Science',
    title: 'Need explanation for recursion and trees.',
    description: 'Provide explanation video on tree structures and recursion.',
    deadline: '30 March 2026',
    budget: '600 EGP',
    materials: [
      { id: 'm1', name: 'PDF 1' },
      { id: 'm2', name: 'PDF 2' },
      { id: 'm3', name: 'PDF 3' },
    ],
    status: 'in-progress',
  },
  {
    id: 'p-exp-2',
    category: 'explain-live',
    studentName: 'A.Saeed',
    initials: 'AS',
    subject: 'Java Programming',
    title: 'Object Oriented Programming (Java) session.',
    description: 'Live 1-on-1 tutoring session covering polymorphism and inheritance.',
    deadline: '2 April 2026',
    budget: '800 EGP',
    materials: [
      { id: 'm4', name: 'PDF 1' },
      { id: 'm5', name: 'PDF 2' },
      { id: 'm6', name: 'PDF 3' },
    ],
    status: 'in-progress',
  },
];

const DEFAULT_CHATS: Record<string, ChatMessage[]> = {
  'default': [
    { id: 'c1', sender: 'student', text: 'Hello! How have you been feeling since our last session?', time: '7:02 PM' },
    { id: 'c2', sender: 'instructor', text: 'A bit anxious about the upcoming project, but practicing the breathing techniques.', time: '7:04 PM' },
    { id: 'c3', sender: 'system', text: 'ENCRYPTED CHAT SESSION STARTED', time: '' },
    { id: 'c4', sender: 'student', text: "That's good to hear. We'll focus on workplace stress management today.", time: '7:06 PM' },
  ],
};

const InstructorContext = createContext<InstructorContextType | undefined>(undefined);

export const InstructorProvider = ({ children }: { children: ReactNode }) => {
  // 1. Profile State
  const [profile, setProfile] = useState<InstructorProfileData>(() => {
    try {
      const saved = localStorage.getItem('jar_instructor_profile');
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  // 2. Notifications State
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem('jar_instructor_notifications');
      return saved ? JSON.parse(saved) : DEFAULT_NOTIFICATIONS;
    } catch {
      return DEFAULT_NOTIFICATIONS;
    }
  });

  // 3. Offers State
  const [offers, setOffers] = useState<OfferData[]>(() => {
    try {
      const saved = localStorage.getItem('jar_instructor_offers');
      return saved ? JSON.parse(saved) : DEFAULT_OFFERS;
    } catch {
      return DEFAULT_OFFERS;
    }
  });

  // 4. Projects State
  const [projects, setProjects] = useState<ProjectData[]>(() => {
    try {
      const saved = localStorage.getItem('jar_instructor_projects');
      return saved ? JSON.parse(saved) : DEFAULT_PROJECTS;
    } catch {
      return DEFAULT_PROJECTS;
    }
  });

  // 5. Chats State
  const [chats, setChats] = useState<Record<string, ChatMessage[]>>(() => {
    try {
      const saved = localStorage.getItem('jar_instructor_chats');
      return saved ? JSON.parse(saved) : DEFAULT_CHATS;
    } catch {
      return DEFAULT_CHATS;
    }
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('jar_instructor_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('jar_instructor_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('jar_instructor_offers', JSON.stringify(offers));
  }, [offers]);

  useEffect(() => {
    localStorage.setItem('jar_instructor_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('jar_instructor_chats', JSON.stringify(chats));
  }, [chats]);

  // Profile actions
  const updateProfile = (updated: Partial<InstructorProfileData>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
  };

  const withdrawFunds = (amount: number, currency: 'SAR' | 'EGP' = 'SAR'): boolean => {
    if (currency === 'SAR') {
      if (profile.walletBalanceSAR < amount) return false;
      setProfile((prev) => ({
        ...prev,
        walletBalanceSAR: prev.walletBalanceSAR - amount,
      }));
    } else {
      if (profile.walletBalanceEGP < amount) return false;
      setProfile((prev) => ({
        ...prev,
        walletBalanceEGP: prev.walletBalanceEGP - amount,
      }));
    }

    addNotification({
      type: 'payment',
      title: 'Withdrawal Initiated',
      description: `Your withdrawal of ${amount} ${currency} has been processed successfully.`,
      isNew: true,
    });
    return true;
  };

  // Notification actions
  const addNotification = (item: Omit<NotificationItem, 'id' | 'time'>) => {
    const newItem: NotificationItem = {
      ...item,
      id: 'notif-' + Date.now(),
      time: 'Just now',
      read: false,
    };
    setNotifications((prev) => [newItem, ...prev]);
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, isNew: false, read: true }))
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isNew: false, read: true } : n))
    );
  };

  const unreadCount = notifications.filter((n) => !n.read || n.isNew).length;

  // Offers actions
  const submitNewOffer = (offerInput: Omit<OfferData, 'id' | 'status'>): OfferData => {
    const newOffer: OfferData = {
      ...offerInput,
      id: 'off-' + Date.now(),
      status: 'pending',
    };
    setOffers((prev) => [newOffer, ...prev]);

    addNotification({
      type: 'offer-submitted',
      title: 'Offer Submitted',
      description: `Your offer for ${offerInput.studentName} has been successfully submitted.`,
      isNew: true,
    });

    return newOffer;
  };

  const approveOffer = (offerId: string) => {
    let approvedOffer: OfferData | undefined;

    setOffers((prev) =>
      prev.map((off) => {
        if (off.id === offerId) {
          approvedOffer = { ...off, status: 'approved' };
          return approvedOffer;
        }
        return off;
      })
    );

    if (approvedOffer) {
      const budgetNum = approvedOffer.totalPrice || 600;
      // Add to wallet balance
      setProfile((prev) => ({
        ...prev,
        walletBalanceEGP: prev.walletBalanceEGP + budgetNum,
      }));

      // Create new project
      const newProj: ProjectData = {
        id: 'proj-' + Date.now(),
        category:
          approvedOffer.category === 'assignment'
            ? 'assignment'
            : approvedOffer.category === 'explain-live'
            ? 'explain-live'
            : 'explain-video',
        studentName: approvedOffer.studentName,
        initials: approvedOffer.studentName.slice(0, 2).toUpperCase(),
        subject: approvedOffer.subject,
        title: approvedOffer.title || approvedOffer.subject,
        description: approvedOffer.description,
        deadline: approvedOffer.deadline,
        budget: `${budgetNum} EGP`,
        filename: approvedOffer.filename,
        status: 'in-progress',
      };

      setProjects((prev) => [newProj, ...prev]);

      addNotification({
        type: 'offer-accepted',
        title: 'Offer Accepted & Project Created',
        description: `Your offer for ${approvedOffer.studentName} has been approved and moved to My Projects.`,
        isNew: true,
      });

      addNotification({
        type: 'payment',
        title: 'Payment Added',
        description: `${budgetNum} EGP has been added to your wallet balance.`,
        isNew: true,
      });
    }
  };

  // Projects actions
  const deliverProject = (
    projectId: string,
    payload: { videoName?: string; projectName?: string }
  ) => {
    let targetProject: ProjectData | undefined;

    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id === projectId) {
          targetProject = {
            ...proj,
            status: 'delivered',
            deliveredAt: new Date().toLocaleDateString(),
            deliveredVideoName: payload.videoName,
            deliveredProjectName: payload.projectName,
          };
          return targetProject;
        }
        return proj;
      })
    );

    if (targetProject) {
      addNotification({
        type: 'project-assigned',
        title: 'Project Delivered Successfully',
        description: `Project for ${targetProject.studentName} has been delivered.`,
        isNew: true,
      });
    }
  };

  // Chats actions
  const sendChatMessage = (
    chatKey: string,
    text: string,
    sender: 'instructor' | 'student' = 'instructor'
  ) => {
    const newMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChats((prev) => {
      const existing = prev[chatKey] || prev['default'] || [];
      return {
        ...prev,
        [chatKey]: [...existing, newMsg],
      };
    });
  };

  return (
    <InstructorContext.Provider
      value={{
        profile,
        updateProfile,
        withdrawFunds,

        notifications,
        unreadCount,
        addNotification,
        markAllNotificationsRead,
        markNotificationRead,

        offers,
        submitNewOffer,
        approveOffer,

        projects,
        deliverProject,

        chats,
        sendChatMessage,
      }}
    >
      {children}
    </InstructorContext.Provider>
  );
};

export const useInstructor = () => {
  const context = useContext(InstructorContext);
  if (!context) {
    throw new Error('useInstructor must be used within an InstructorProvider');
  }
  return context;
};
