import React from 'react';
import { Component } from 'react';
import CheckBox from './CheckBox';

class CheckBoxRef2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
          fruites: [
            { id: 1, value: "banana", isChecked: false },
            { id: 2, value: "apple", isChecked: false },
            { id: 3, value: "mango", isChecked: false },
            { id: 4, value: "grap", isChecked: false }
          ]
        };
      }
    
      handleAllChecked = (event) => {
        let fruites = this.state.fruites;
        fruites.forEach((fruite) => (fruite.isChecked = event.target.checked));
        this.setState({ fruites: fruites });
      };
    
      handleCheckChieldElement = (event) => {
        let fruites = this.state.fruites;
        fruites.forEach((fruite) => {
          if (fruite.value === event.target.value)
            fruite.isChecked = event.target.checked;
          console.log(event.target.checked);
        });
        this.setState({ fruites: fruites });
      };
    
      render() {
        return (
          <div className="App">
            <h1> Check and Uncheck All Example </h1>
            <input
              type="checkbox"
              onClick={this.handleAllChecked}
              value="checkedall"
            />{" "}
            Check / Uncheck All
            <ul>
              {this.state.fruites.map((fruite) => {
                return (
                  <CheckBox
                    handleCheckChieldElement={this.handleCheckChieldElement}
                    {...fruite}
                  />
                );
              })}
            </ul>
            <hr />
            <table border="1">
              <thead>
                <tr>
                  <th>id</th>
                  <th>value</th>
                  <th>isChecked</th>
                </tr>
              </thead>
              <tbody>
                {this.state.fruites.map((x, i) => {
                  return (
                    <tr>
                      <td>{x.id}</td>
                      <td>{x.value}</td>
                      <td>{x.isChecked.toString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      }
    }

