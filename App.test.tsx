import { render, screen, fireEvent, act } from "@testing-library/react";
import axios from "axios";
import { BrowserRouter} from "react-router-dom";
import CapitalDetailsCard from "./components/CapitalDetailsCard";
import CountryDetailsCard from "./components/CountryDetailsCard";
import Information from "./components/Information";
import InputField from "./components/InputField";
import CapitalDetails from "./pages/CapitalDetails";

const data = {
  name: {
    common: "India",
  },
  capital: ["New Delhi"],
  population: 1380004385,
  capitalInfo: {
    latlng: [28.6, 77.2],
  },
  flags: {
    png: "https://flagcdn.com/w320/in.png",
  },
};

const CapitalData = {
  location: {
    name: "Tokyo",
    timezone_id: "Asia/Tokyo",
  },
  current: {
    temperature: 23,
    weather_icons: [
      "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.png",
    ],
    wind_speed: 6,
  },
};

describe("test CapitalDetailsCard component", () => {
  test("render CapitalDetailsCard component", () => {
    render(<CapitalDetailsCard data={CapitalData} />);
  });
});

describe("test CountryDetailsCard component", () => {
  test("render CountryDetailsCard component", () => {
    render(<BrowserRouter><CountryDetailsCard data={data} /></BrowserRouter>);
  });
});

describe("test Information component", () => {
  test("render Information component", () => {
    render(<Information data={data} />);
  });
});

describe("test Input Field component", () => {
  test("render Input Field component", () => {
    const InputFieldProps = {
      onChange: jest.fn(),
      className: "inputField",
      placeHolder: "Country Name",
    };
    render(<InputField {...InputFieldProps} />);
    screen.debug();
  });

  test("snapshot testing", () => {
    const InputFieldProps = {
      onChange: jest.fn(),
      className: "inputField",
      placeHolder: "Country Name",
    };
    const { container } = render(<InputField {...InputFieldProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test("check if on change is called", () => {
    const InputFieldProps = {
      onChange: jest.fn(),
      className: "inputField",
      placeHolder: "Country Name",
    };
    render(<InputField {...InputFieldProps} />);
    const inputElement = screen.getByDisplayValue("");
    screen.debug();
    fireEvent.change(inputElement, { target: { value: "India" } });
    expect(InputFieldProps.onChange).toHaveBeenCalledTimes(1);
  });
});