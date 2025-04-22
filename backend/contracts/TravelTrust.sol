// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TravelTrust {
    struct Booking {
        address user;
        string serviceId;
        bool reviewed;
    }

    struct Review {
        address user;
        string serviceId;
        string reviewText;
        uint timestamp;
    }

    mapping(address => Booking[]) public bookings;
    mapping(string => Review[]) public serviceReviews; // Mapping serviceId to reviews
    mapping(address => mapping(string => bool)) public userReviewed; // Track if user has reviewed a service

    event ServiceBooked(address indexed user, string serviceId);
    event ReviewSubmitted(address indexed user, string serviceId, string reviewText);

    function bookService(string memory serviceId) public {
        bookings[msg.sender].push(Booking(msg.sender, serviceId, false));
        emit ServiceBooked(msg.sender, serviceId);
    }

    function submitReview(string memory serviceId, string memory reviewText) public {
        Booking[] storage userBookings = bookings[msg.sender];
        bool hasBooking = false;

        for (uint i = 0; i < userBookings.length; i++) {
            if (
                keccak256(abi.encodePacked(userBookings[i].serviceId)) == keccak256(abi.encodePacked(serviceId)) &&
                !userBookings[i].reviewed
            ) {
                hasBooking = true;
                userBookings[i].reviewed = true;
                break;
            }
        }

        require(hasBooking, "No booking found or already reviewed.");
        require(!userReviewed[msg.sender][serviceId], "You have already reviewed this service.");

        // Store the review
        serviceReviews[serviceId].push(Review(msg.sender, serviceId, reviewText, block.timestamp));
        userReviewed[msg.sender][serviceId] = true;

        emit ReviewSubmitted(msg.sender, serviceId, reviewText);
    }

    function getReviews(string memory serviceId) public view returns (Review[] memory) {
        return serviceReviews[serviceId]; // Return reviews for a specific serviceId
    }
}
