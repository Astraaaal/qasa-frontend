export const fetchDepartments = async (token: string) => {
    const response = await fetch("http://26.45.117.162/test_api/api/Department", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch departments");
    }
    
    const data = await response.json();
    
    return data.department || []; // Assuming the department data is inside 'department' field
  };
  