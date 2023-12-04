import { useState, useEffect } from "react";
import axios from "axios";
import ProgressBar from "react-bootstrap/ProgressBar";
import Loader from "../components/Loader";

const JiraDashboard = () => {
  const [data, setData] = useState({
    assignedTasks: [],
    unassignedTasks: 0,
    totalTasks: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://olive-xerus-tutu.cyclic.app/api/jira");
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const calculatePercentage = (value, total) => {
    return total !== 0 ? Math.round((value / total) * 100) : 0;
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <div>
            <h2 className="p-4 my-4">Jira Dashboard</h2>
          </div>
          <div className="shadow-sm p-3 mb-5 bg-white rounded">
            <div>
              <h4 className="p-2 text-gray-600">
                Issue Statistics: My Kanban Project (Assignee)
              </h4>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Count</th>
                  <th scope="col">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {data?.assignedTasks?.map((assignedTask) => (
                  <tr key={assignedTask.name}>
                    <td>{assignedTask.name}</td>
                    <td>{assignedTask.count}</td>
                    <td>
                      <ProgressBar
                        variant="info"
                        now={calculatePercentage(
                          assignedTask.count,
                          data.totalTasks
                        )}
                        label={`${calculatePercentage(
                          assignedTask.count,
                          data.totalTasks
                        )}%`}
                      />
                    </td>
                  </tr>
                ))}
                <tr>
                  <td>Unassigned</td>
                  <td>{data?.unassignedTasks}</td>
                  <td>
                    <ProgressBar
                      variant="info"
                      now={calculatePercentage(
                        data?.unassignedTasks,
                        data?.totalTasks
                      )}
                      label={`${calculatePercentage(
                        data?.unassignedTasks,
                        data?.totalTasks
                      )}%`}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="p-2">
              <b>Total Tasks:</b> {data?.totalTasks}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default JiraDashboard;
