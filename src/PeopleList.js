import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, selectPeople } from './peopleSlice';
import {
  CircularProgress,
  Table as MUITable,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAndroid,
  faUserCircle,
  faQuestionCircle,
  faExclamationCircle,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';

function Table() {
  const dispatch = useDispatch();
  const people = useSelector(selectPeople);
  const [totalDroids, setTotalDroids] = useState(0);
  const [totalHumans, setTotalHumans] = useState(0);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    if (people.data.length > 0) {
      const droids = people.data.filter((person) => person.species === 'Droid');
      const humans = people.data.filter((person) => person.species === 'Human');
      setTotalDroids(droids.length);
      setTotalHumans(humans.length);
    }
  }, [people.data]);

  if (people.loading) {
    return <CircularProgress />;
  }

  if (people.error) {
    return (
      <div>
        <FontAwesomeIcon icon={faExclamationCircle} />
        <p>Error: {people.error}</p>
      </div>
    );
  }

  if (people.data.length === 0) {
    return (
      <div>
        <FontAwesomeIcon icon={faInfoCircle} />
        <p>No results found.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Search input Field for searching people */}
      <TextField
        label="Search"
        variant="outlined"
        onChange={(e) => dispatch(fetchData(e.target.value))}
      />
      <div className="count-cards">
        <div className="count-card">
          <FontAwesomeIcon icon={faAndroid} />
          <p>Total Droids: {totalDroids}</p>
        </div>
        <div className="count-card">
          <FontAwesomeIcon icon={faUserCircle} />
          <p>Total Humans: {totalHumans}</p>
        </div>
        <div className="count-card">
          <FontAwesomeIcon icon={faQuestionCircle} />
          <p>Total Others: {people.data.length - totalDroids - totalHumans}</p>
        </div>
      </div>
      <MUITable>
        {/* Table Header for getting People */}
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Species</TableCell>
            {/* Add more columns if needed */}
          </TableRow>
        </TableHead>
        {/* Table Body for getting people */}
        <TableBody>
          {people.data.map((person) => (
            <TableRow key={person.name}>
              <TableCell>{person.name}</TableCell>
              <TableCell>
                {person.species === 'Droid' ? (
                  <FontAwesomeIcon icon={faAndroid} />
                ) : person.species === 'Human' ? (
                  <FontAwesomeIcon icon={faUserCircle} />
                ) : (
                  <FontAwesomeIcon icon={faQuestionCircle} />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MUITable>
    </div>
  );
}

export default Table;
