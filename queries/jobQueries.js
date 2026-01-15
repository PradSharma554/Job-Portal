import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useGetFeaturedJobs = () => {
  return useQuery({
    queryKey: ["featuredJobs"],
    queryFn: async () => {
      const res = await fetch("/api/job?limit=4");
      if (!res.ok) throw new Error("Failed to fetch featured jobs");
      return res.json();
    },
  });
};

export const useGetAllJobs = ({ search = "" } = {}) => {
  return useQuery({
    queryKey: ["allJobs", search],
    queryFn: async () => {
      const params = search ? `?search=${search}` : "";
      const res = await fetch(`/api/job${params}`);
      if (!res.ok) throw new Error("Failed to fetch jobs");
      return res.json();
    },
  });
};

export const useGetJobDetails = (id) => {
  return useQuery({
    queryKey: ["jobDetails", id],
    queryFn: async () => {
      const res = await fetch(`/api/job/${id}`);
      if (!res.ok) throw new Error("Failed to fetch job details");
      return res.json();
    },
    enabled: !!id,
  });
};

export const usePostJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (jobData) => {
      const res = await fetch("/api/job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to post job");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allJobs"]);
      queryClient.invalidateQueries(["featuredJobs"]);
    },
  });
};

export const useGetSavedJobs = () => {
  return useQuery({
    queryKey: ["savedJobs"],
    queryFn: async () => {
      const res = await fetch("/api/user/saved");
      if (res.status === 401) return [];
      if (!res.ok) throw new Error("Failed to fetch saved jobs");
      const data = await res.json();
      return data.savedJobs || [];
    },
    retry: false,
  });
};

export const useToggleSaveJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (jobId) => {
      const res = await fetch("/api/user/saved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId }),
      });
      if (!res.ok) throw new Error("Failed to save job");
      return res.json();
    },
    onSuccess: (data) => {
      // Invalidate savedJobs to refetch the fresh list
      queryClient.invalidateQueries(["savedJobs"]);
    },
  });
};
