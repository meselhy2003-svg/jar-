import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';
import BASE_URL from '../api/config';

export type RequestCategory = 'trial' | 'assignment' | 'explain-video' | 'explain-live';

export type RequestStatus =
  | 'pending'
  | 'offers_received'
  | 'approved'
  | 'in-progress'
  | 'delivered'
  | 'completed';

export interface RequestOffer {
  id: string;
  requestId: string;
  instructorId?: string;
  instructorName: string;
  instructorInitials?: string;
  estimatedHours?: number;
  hourlyRate?: number;
  totalPrice: number;
  currency: string;
  notes?: string;
  submittedVideoName?: string;
  submittedVideoUrl?: string;
  submittedAt: string;
  status: 'pending' | 'accepted' | 'declined';
}

export interface StudentRequest {
  id: string;
  category: RequestCategory;
  title: string;
  subject: string;
  description: string;
  deadline: string;
  budget: string;
  filename: string;
  fileMeta: string;
  allFiles?: string[];
  studentId: string;
  studentName: string;
  studentInitials: string;
  studentEmail: string;
  status: RequestStatus;
  createdAt: string;
  offers: RequestOffer[];
  acceptedOfferId?: string;
  deliveredSolutionFile?: string;
  deliveredVideoName?: string;
  deliveredVideoUrl?: string;
  deliveredAt?: string;
}

export interface StudentNotificationItem {
  id: string;
  icon: string;
  title: string;
  desc: string;
  time: string;
  unread: boolean;
  link?: string;
  requestId?: string;
}

interface RequestContextType {
  requests: StudentRequest[];
  studentNotifications: StudentNotificationItem[];
  unreadStudentNotifCount: number;
  addRequest: (
    reqData: Omit<StudentRequest, 'id' | 'createdAt' | 'status' | 'offers'>
  ) => StudentRequest;
  submitOffer: (
    requestId: string,
    offerData: {
      instructorName: string;
      instructorInitials?: string;
      estimatedHours?: number;
      hourlyRate?: number;
      totalPrice?: number;
      currency?: string;
      notes?: string;
      submittedVideoName?: string;
      submittedVideoUrl?: string;
    }
  ) => RequestOffer | null;
  approveOffer: (requestId: string, offerId: string) => boolean;
  deliverProject: (
    requestId: string,
    payload: {
      solutionFile?: string;
      videoName?: string;
      videoUrl?: string;
    }
  ) => boolean;
  markAllStudentNotifsRead: () => void;
  markStudentNotifRead: (id: string) => void;
  getRequestsByCategory: (category: RequestCategory) => StudentRequest[];
}

// ─── Default Seed Requests (Matches existing UI mockups) ──────────────────────

const DEFAULT_REQUESTS: StudentRequest[] = [
  // 1. Trial Request 1
  {
    id: 'req-trial-1',
    category: 'trial',
    title: 'Data Structures - Linked Lists',
    subject: 'Data Structures',
    description:
      'Need help understanding linked lists and basic implementation. Specifically focusing on doubly linked lists and memory management in C++.',
    deadline: '25 March 2026',
    budget: 'Free Trial',
    filename: 'trial_task_data_structures.pdf',
    fileMeta: 'PDF Document • 1.8 MB',
    allFiles: ['trial_task_data_structures.pdf'],
    studentId: 'std-1',
    studentName: 'A.Amr',
    studentInitials: 'AA',
    studentEmail: 'a.amr@student.com',
    status: 'offers_received',
    createdAt: '2026-03-20T10:00:00.000Z',
    offers: [
      {
        id: 'off-trial-1',
        requestId: 'req-trial-1',
        instructorName: 'Dr. Ahmed Mohamed',
        instructorInitials: 'AM',
        totalPrice: 0,
        currency: 'EGP',
        notes: 'Here is a trial walkthrough for doubly linked lists memory management.',
        submittedVideoName: 'trial_linked_list_intro.mp4',
        submittedAt: '2 hours ago',
        status: 'pending',
      },
    ],
  },
  // 2. Trial Request 2
  {
    id: 'req-trial-2',
    category: 'trial',
    title: 'Software Architecture Review',
    subject: 'Software Architecture',
    description:
      'Reviewing microservices architecture patterns and event-driven systems. Need a deep dive into Kafka versus RabbitMQ implementations.',
    deadline: '28 March 2026',
    budget: 'Free Trial',
    filename: 'architecture_review_draft.pdf',
    fileMeta: 'PDF Document • 2.1 MB',
    allFiles: ['architecture_review_draft.pdf'],
    studentId: 'std-2',
    studentName: 'S.Ahmed',
    studentInitials: 'SA',
    studentEmail: 's.ahmed@student.com',
    status: 'pending',
    createdAt: '2026-03-21T12:00:00.000Z',
    offers: [],
  },
  // 3. Assignment Request 1
  {
    id: 'req-asg-1',
    category: 'assignment',
    title: 'Database Normalization & SQL Queries',
    subject: 'Database Systems',
    description:
      'Need help completing SQL queries and normalization tasks for a university project.',
    deadline: '28 March 2026',
    budget: '600 EGP',
    filename: 'assignment.pdf',
    fileMeta: 'PDF Document • 2.4 MB',
    allFiles: ['assignment.pdf'],
    studentId: 'std-3',
    studentName: 'O.Mohamed',
    studentInitials: 'OM',
    studentEmail: 'o.mohamed@student.com',
    status: 'in-progress',
    createdAt: '2026-03-18T09:00:00.000Z',
    offers: [
      {
        id: 'off-asg-1',
        requestId: 'req-asg-1',
        instructorName: 'Dr. Ahmed Mohamed',
        instructorInitials: 'AM',
        totalPrice: 600,
        currency: 'EGP',
        notes: 'Detailed SQL query optimization and full 3NF normalization schemas.',
        submittedAt: 'Yesterday',
        status: 'accepted',
      },
    ],
    acceptedOfferId: 'off-asg-1',
  },
  // 4. Assignment Request 2
  {
    id: 'req-asg-2',
    category: 'assignment',
    title: 'Operating Systems Scheduling & Shell',
    subject: 'Operating Systems',
    description:
      'Solving shell scripting problems and process scheduling algorithms implementation.',
    deadline: '02 April 2026',
    budget: '400 EGP',
    filename: 'instructions_os.pdf',
    fileMeta: 'PDF Document • 1.1 MB',
    allFiles: ['instructions_os.pdf'],
    studentId: 'std-1',
    studentName: 'A.Amr',
    studentInitials: 'AA',
    studentEmail: 'a.amr@student.com',
    status: 'pending',
    createdAt: '2026-03-22T14:30:00.000Z',
    offers: [],
  },
  // 5. Assignment Request 3
  {
    id: 'req-asg-3',
    category: 'assignment',
    title: 'Balanced Binary Search Trees & Graphs',
    subject: 'Data Structures',
    description:
      'Implementation of balanced binary search trees and complex graph traversal algorithms.',
    deadline: '15 April 2026',
    budget: '750 EGP',
    filename: 'project_spec.pdf',
    fileMeta: 'PDF Document • 3.7 MB',
    allFiles: ['project_spec.pdf'],
    studentId: 'std-2',
    studentName: 'S.Ahmed',
    studentInitials: 'SA',
    studentEmail: 's.ahmed@student.com',
    status: 'pending',
    createdAt: '2026-03-23T11:00:00.000Z',
    offers: [],
  },
  // 6. Explain Video Request 1
  {
    id: 'req-exp-1',
    category: 'explain-video',
    title: 'Need explanation for recursion and trees.',
    subject: 'Computer Science',
    description:
      'Provide explanation video on tree structures and recursion traversals.',
    deadline: '30 March 2026',
    budget: '600 EGP',
    filename: 'tree_traversals_notes.pdf',
    fileMeta: 'PDF Document • 3.2 MB',
    allFiles: ['PDF 1', 'PDF 2', 'PDF 3'],
    studentId: 'std-3',
    studentName: 'O.Mohamed',
    studentInitials: 'OM',
    studentEmail: 'o.mohamed@student.com',
    status: 'in-progress',
    createdAt: '2026-03-22T08:00:00.000Z',
    offers: [
      {
        id: 'off-exp-1',
        requestId: 'req-exp-1',
        instructorName: 'Dr. Ahmed Mohamed',
        instructorInitials: 'AM',
        estimatedHours: 3,
        hourlyRate: 200,
        totalPrice: 600,
        currency: 'EGP',
        notes: 'High-definition 3-part video walkthrough covering recursion.',
        submittedAt: '2 hours ago',
        status: 'accepted',
      },
    ],
    acceptedOfferId: 'off-exp-1',
  },
  // 7. Explain Live Request 1
  {
    id: 'req-live-1',
    category: 'explain-live',
    title: 'Explain software architecture patterns live',
    subject: 'Software Architecture',
    description:
      'Live 1-on-1 tutoring session covering event-driven patterns, microservices, and message brokers.',
    deadline: '30 March 2026',
    budget: '900 EGP',
    filename: 'architecture_overview.pdf',
    fileMeta: 'PDF Document • 4.1 MB',
    allFiles: ['architecture_overview.pdf', 'diagram_reference.pdf'],
    studentId: 'std-4',
    studentName: 'M.Khaled',
    studentInitials: 'MK',
    studentEmail: 'm.khaled@student.com',
    status: 'pending',
    createdAt: '2026-03-23T16:00:00.000Z',
    offers: [],
  },
];

const DEFAULT_STUDENT_NOTIFICATIONS: StudentNotificationItem[] = [
  {
    id: 'snotif-1',
    icon: '/pdf-icon.png',
    title: 'Assignment Explanation Ready',
    desc: 'Calculus II Homework explanation file is uploaded.',
    time: '10 mins ago',
    unread: true,
    link: '/my-assignments',
  },
  {
    id: 'snotif-2',
    icon: '/student-dash-icons/Icon (17).png',
    title: 'Upcoming Live Session',
    desc: 'Organic Chemistry II session starts in 15 mins.',
    time: '25 mins ago',
    unread: true,
    link: '/session-room',
  },
  {
    id: 'snotif-3',
    icon: '/student-dash-icons/my order.png',
    title: 'Payment Confirmed',
    desc: 'Receipt #84210 confirmed successfully.',
    time: '2 hours ago',
    unread: true,
    link: '/orders',
  },
  {
    id: 'snotif-4',
    icon: '/student-dash-icons/Icon (14).png',
    title: 'New Offer Received',
    desc: 'Dr. Ahmed accepted your Data Structures trial request.',
    time: '3 hours ago',
    unread: false,
    link: '/orders',
  },
];

const RequestContext = createContext<RequestContextType | undefined>(undefined);

export const RequestProvider = ({ children }: { children: ReactNode }) => {
  // 1. Student Requests
  const [requests, setRequests] = useState<StudentRequest[]>(() => {
    try {
      const saved = localStorage.getItem('jar_student_requests');
      return saved ? JSON.parse(saved) : DEFAULT_REQUESTS;
    } catch {
      return DEFAULT_REQUESTS;
    }
  });

  // 2. Student Notifications
  const [studentNotifications, setStudentNotifications] = useState<
    StudentNotificationItem[]
  >(() => {
    try {
      const saved = localStorage.getItem('jar_student_notifications');
      return saved ? JSON.parse(saved) : DEFAULT_STUDENT_NOTIFICATIONS;
    } catch {
      return DEFAULT_STUDENT_NOTIFICATIONS;
    }
  });

  // Persist state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('jar_student_requests', JSON.stringify(requests));
    } catch (e) {
      console.error('Failed to save requests', e);
    }
  }, [requests]);

  useEffect(() => {
    try {
      localStorage.setItem(
        'jar_student_notifications',
        JSON.stringify(studentNotifications)
      );
    } catch (e) {
      console.error('Failed to save student notifications', e);
    }
  }, [studentNotifications]);

  // Unread notification count for Student
  const unreadStudentNotifCount = studentNotifications.filter((n) => n.unread).length;

  const markAllStudentNotifsRead = () => {
    setStudentNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const markStudentNotifRead = (id: string) => {
    setStudentNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  // Add a new Student Request (Called by student in BookSession)
  const addRequest = (
    reqData: Omit<StudentRequest, 'id' | 'createdAt' | 'status' | 'offers'>
  ): StudentRequest => {
    const newReq: StudentRequest = {
      ...reqData,
      id: `req-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
      offers: [],
    };

    setRequests((prev) => [newReq, ...prev]);

    // Also notify instructors by adding an item to instructor notifications in localStorage
    try {
      const rawInstNotifs = localStorage.getItem('jar_instructor_notifications');
      const instNotifs = rawInstNotifs ? JSON.parse(rawInstNotifs) : [];
      const newInstNotif = {
        id: `notif-${Date.now()}`,
        type: 'offer-submitted',
        title: `New Student Request: ${newReq.subject}`,
        description: `${newReq.studentName} requested help for ${newReq.subject} (${newReq.category}).`,
        time: 'Just now',
        isNew: true,
        read: false,
      };
      localStorage.setItem(
        'jar_instructor_notifications',
        JSON.stringify([newInstNotif, ...instNotifs])
      );
    } catch (err) {
      console.warn('Could not sync instructor notification', err);
    }

    // Try posting to backend API if available
    try {
      const token = localStorage.getItem('jar_auth_token');
      if (token) {
        axios
          .post(
            `${BASE_URL}/requests`,
            {
              title: newReq.title,
              subject: newReq.subject,
              description: newReq.description,
              deadline: newReq.deadline,
              budget: newReq.budget,
              type: newReq.category,
            },
            { timeout: 3000 }
          )
          .catch(() => {
            // Silently fall back to localStorage mode if backend unreachable
          });
      }
    } catch {
      // Offline fallback
    }

    return newReq;
  };

  // Submit an offer for a request (Called by instructor in Task views)
  const submitOffer = (
    requestId: string,
    offerData: {
      instructorName: string;
      instructorInitials?: string;
      estimatedHours?: number;
      hourlyRate?: number;
      totalPrice?: number;
      currency?: string;
      notes?: string;
      submittedVideoName?: string;
      submittedVideoUrl?: string;
    }
  ): RequestOffer | null => {
    let createdOffer: RequestOffer | null = null;

    setRequests((prev) =>
      prev.map((req) => {
        if (req.id === requestId) {
          const newOffer: RequestOffer = {
            id: `off-${Date.now()}`,
            requestId,
            instructorName: offerData.instructorName,
            instructorInitials:
              offerData.instructorInitials ||
              offerData.instructorName
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)
                .toUpperCase(),
            estimatedHours: offerData.estimatedHours,
            hourlyRate: offerData.hourlyRate,
            totalPrice: offerData.totalPrice ?? 0,
            currency: offerData.currency || 'EGP',
            notes: offerData.notes,
            submittedVideoName: offerData.submittedVideoName,
            submittedVideoUrl: offerData.submittedVideoUrl,
            submittedAt: 'Just now',
            status: 'pending',
          };
          createdOffer = newOffer;

          return {
            ...req,
            status: 'offers_received',
            offers: [newOffer, ...req.offers],
          };
        }
        return req;
      })
    );

    // Add notification for the student
    const notifTitle = offerData.submittedVideoName
      ? 'Trial Video Submitted'
      : 'New Offer Received';
    const notifDesc = offerData.submittedVideoName
      ? `${offerData.instructorName} submitted a trial explanation video for your request.`
      : `${offerData.instructorName} offered ${offerData.totalPrice || 600} ${
          offerData.currency || 'EGP'
        } for your request.`;

    const newStudentNotif: StudentNotificationItem = {
      id: `snotif-${Date.now()}`,
      icon: offerData.submittedVideoName
        ? '/student-dash-icons/Icon (17).png'
        : '/student-dash-icons/Icon (14).png',
      title: notifTitle,
      desc: notifDesc,
      time: 'Just now',
      unread: true,
      link: '/orders',
      requestId,
    };

    setStudentNotifications((prev) => [newStudentNotif, ...prev]);

    return createdOffer;
  };

  // Student approves an offer (Called by student in My Orders)
  const approveOffer = (requestId: string, offerId: string): boolean => {
    let targetReq: StudentRequest | undefined;
    let targetOffer: RequestOffer | undefined;

    setRequests((prev) =>
      prev.map((req) => {
        if (req.id === requestId) {
          const updatedOffers = req.offers.map((off) => {
            if (off.id === offerId) {
              targetOffer = { ...off, status: 'accepted' };
              return targetOffer;
            }
            return off;
          });
          targetReq = {
            ...req,
            status: 'in-progress',
            acceptedOfferId: offerId,
            offers: updatedOffers,
          };
          return targetReq;
        }
        return req;
      })
    );

    if (targetReq && targetOffer) {
      // 1. Sync project into InstructorContext store in localStorage
      try {
        const rawProjects = localStorage.getItem('jar_instructor_projects');
        const projects = rawProjects ? JSON.parse(rawProjects) : [];
        const newProj = {
          id: `proj-${Date.now()}`,
          requestId: targetReq.id,
          category:
            targetReq.category === 'assignment'
              ? 'assignment'
              : targetReq.category === 'explain-live'
              ? 'explain-live'
              : 'explain-video',
          studentName: targetReq.studentName,
          initials: targetReq.studentInitials,
          subject: targetReq.subject,
          title: targetReq.title || targetReq.subject,
          description: targetReq.description,
          deadline: targetReq.deadline,
          budget: `${targetOffer.totalPrice || 600} ${targetOffer.currency || 'EGP'}`,
          filename: targetReq.filename,
          fileMeta: targetReq.fileMeta,
          status: 'in-progress',
        };
        localStorage.setItem(
          'jar_instructor_projects',
          JSON.stringify([newProj, ...projects])
        );

        // 2. Add wallet balance to instructor
        const rawProfile = localStorage.getItem('jar_instructor_profile');
        if (rawProfile) {
          const prof = JSON.parse(rawProfile);
          prof.walletBalanceEGP = (prof.walletBalanceEGP || 0) + (targetOffer.totalPrice || 600);
          localStorage.setItem('jar_instructor_profile', JSON.stringify(prof));
        }

        // 3. Add notification to instructor
        const rawInstNotifs = localStorage.getItem('jar_instructor_notifications');
        const instNotifs = rawInstNotifs ? JSON.parse(rawInstNotifs) : [];
        const newInstNotif = {
          id: `notif-${Date.now()}`,
          type: 'offer-accepted',
          title: 'Offer Accepted & Project Assigned',
          description: `${targetReq.studentName} accepted your offer for ${targetReq.subject}. Added to My Projects!`,
          time: 'Just now',
          isNew: true,
          read: false,
        };
        localStorage.setItem(
          'jar_instructor_notifications',
          JSON.stringify([newInstNotif, ...instNotifs])
        );
      } catch (err) {
        console.warn('Could not sync to instructor storage', err);
      }

      return true;
    }

    return false;
  };

  // Instructor delivers project/solution (Called by instructor in MyProjects)
  const deliverProject = (
    requestId: string,
    payload: {
      solutionFile?: string;
      videoName?: string;
      videoUrl?: string;
    }
  ): boolean => {
    let targetReq: StudentRequest | undefined;

    setRequests((prev) =>
      prev.map((req) => {
        if (
          req.id === requestId ||
          req.title === requestId ||
          req.subject === requestId ||
          (requestId && (req.id.includes(requestId) || requestId.includes(req.id)))
        ) {
          targetReq = {
            ...req,
            status: 'delivered',
            deliveredSolutionFile: payload.solutionFile || 'solved_assignment_final.pdf',
            deliveredVideoName: payload.videoName,
            deliveredVideoUrl: payload.videoUrl,
            deliveredAt: new Date().toLocaleDateString(),
          };
          return targetReq;
        }
        return req;
      })
    );

    // Add notification to student that solution is ready
    const subjectName = targetReq?.subject || 'Assignment';
    const deliveryNotif: StudentNotificationItem = {
      id: `snotif-${Date.now()}`,
      icon: '/pdf-icon.png',
      title: 'Assignment Explanation Ready',
      desc: `Your solution and explanation for ${subjectName} is uploaded and ready for download.`,
      time: 'Just now',
      unread: true,
      link: '/my-assignments',
      requestId: targetReq?.id,
    };

    setStudentNotifications((prev) => [deliveryNotif, ...prev]);

    return true;
  };

  const getRequestsByCategory = (category: RequestCategory): StudentRequest[] => {
    return requests.filter((r) => r.category === category);
  };

  return (
    <RequestContext.Provider
      value={{
        requests,
        studentNotifications,
        unreadStudentNotifCount,
        addRequest,
        submitOffer,
        approveOffer,
        deliverProject,
        markAllStudentNotifsRead,
        markStudentNotifRead,
        getRequestsByCategory,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};

export const useRequests = () => {
  const context = useContext(RequestContext);
  if (!context) {
    throw new Error('useRequests must be used within a RequestProvider');
  }
  return context;
};
