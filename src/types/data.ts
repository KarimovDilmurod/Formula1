
  export interface Driver {
    driverId: string;
    permanentNumber?: string;
    code?: string;
    url: string;
    givenName: string;
    familyName: string;
    dateOfBirth: string;
    nationality: string;
  }

  export interface RaceResult {
    raceName: string;
    round: string;
    date: string;
    position: string;
    Constructor: {
      name: string;
    };
    circuitName: string;
  }
