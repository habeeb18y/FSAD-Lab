import React from "react";

const studlist = [
  { slno: 1, name: "std1", usn: "1rv25", tmarks: 80 },
  { slno: 2, name: "std2", usn: "1rv26", tmarks: 75 },
];

class StudentRow extends React.Component {
  render() {
    const studl = this.props.stdli;
    return (
      <tr>
        <td>{studl.slno}</td>
        <td>{studl.name}</td>
        <td>{studl.usn}</td>
        <td>{studl.tmarks}</td>
      </tr>
    );
  }
}

class StudentsTable extends React.Component {
  render() {
    const studrows = this.props.studlist.map((studli) => (
      <StudentRow key={studli.slno} stdli={studli} />
    ));

    return (
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Sl No</th>
            <th>Student Name</th>
            <th>USN</th>
            <th>Total Marks</th>
          </tr>
        </thead>
        <tbody>{studrows}</tbody>
      </table>
    );
  }
}

class StudentAddSubmit extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.studAdd;
    const studli = {
      name: form.name.value,
      usn: form.usn.value,
      tmarks: Number(form.tmarks.value),
    };

    this.props.CreateStudentAdd(studli);
    form.reset();
  }

  render() {
    return (
      <form name="studAdd" onSubmit={this.handleSubmit}>
        <input type="text" name="name" placeholder="Name" required />
        <input type="text" name="usn" placeholder="USN" required />
        <input type="number" name="tmarks" placeholder="Total Marks" required />
        <button type="submit" disabled={this.props.isLoading}>
          {this.props.isLoading ? "Loading..." : "Add"}
        </button>
      </form>
    );
  }
}

class StudentListTable extends React.Component {
  constructor() {
    super();
    this.state = { newStudList: [], isLoading: true };
    this.CreateStudentAdd = this.CreateStudentAdd.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ newStudList: studlist, isLoading: false });
    }, 5000);
  }

  CreateStudentAdd(studli) {
    const studlength = this.state.newStudList.length + 1;
    studli.slno = studlength;
    const newstudlist1 = [...this.state.newStudList, studli];
    this.setState({ newStudList: newstudlist1 });
  }

  render() {
    return (
      <React.Fragment>
        <hr />
        <StudentsTable studlist={this.state.newStudList} />
        <hr />
        <StudentAddSubmit
          CreateStudentAdd={this.CreateStudentAdd}
          isLoading={this.state.isLoading}
        />
      </React.Fragment>
    );
  }
}

export default StudentListTable;
