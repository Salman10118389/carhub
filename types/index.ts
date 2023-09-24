"useClient";
import { Dispatch, MouseEventHandler } from "react";
import React from 'react';

export interface CustomButtonProps {
    title: String;
    btnType?: "button" | "submit";
    containerStyles?: string;
    textStyles? : string;
    rightIcon?: string;
    isDisabled?: string;
    handleClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface SearchManufacturerProps {
    selected: String,
    setSelected: (manufacturer: string) => void;
}

export interface CarProps {
    city_mpg: number; 
    class: string;
    combination_mpg: number;  
    cylinders: number;       
    displacement: number;
    drive: string;
    fuel_type: string;
    highway_mpg: number;
    make: string; 
    model: string;   
    transmision: string;
    year: number;                
}

export const calculateCarRent = ((city_mpg: number, year: number) => {
    // In USD$
    const basePricePerDay = 50; 
    // Additional Per Mile Driven
    const mileageFactor = 0.1;
    // Additional rate per year of vehicle age
    const ageFactor = 0.05;
    
    // Calculate additional rate based on mileage and age
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;

    // Calculate total rental rate per day 
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

    return rentalRatePerDay.toFixed(0);
});

export interface FilterProps {
    manufacturer: string;    
    year: string;
    fuel: string;
    limit: number;
    model: string;
}

export interface searchBarProps {
    setManufacturer: (value: string) => void;
    setModel: (value: string) => void; 
}

export interface OptionsProps {
    title: string;
    value: string;
}

export interface CustomFilterProps {
    title: string;
    options: OptionsProps[];
    setFilter: (value: string) => void;
}

export interface ShowMoreProps {
    pageNumber: number;
    isNext: boolean;
    setLimit: (value: number) => void
}

export interface HomeProps {
    searchParams: FilterProps;
  }





