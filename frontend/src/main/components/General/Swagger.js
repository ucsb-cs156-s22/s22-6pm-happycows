import React, { Component } from "react";
import SwaggerUi, { presets } from "swagger-ui";
import "swagger-ui/dist/swagger-ui.css";

class Swagger extends Component {
  componentDidMount() {
    SwaggerUi({
      dom_id: "#swaggerContainer",
      url: "/api/docs",
      presets: [presets.apis],
    });
  }

  render() {
    return <div id="swaggerContainer" />;
  }
}

export default Swagger;
