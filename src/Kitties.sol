pragma solidity ^0.4.18;

contract Kitties {
  address[16] public owners;

  event Adopted(
    uint indexed kitty,
    address indexed owner
  );

  function adopt(uint kitty) public {
    require(kitty >= 0 && kitty < 16);
    if (owners[kitty] == address(0)) {
      owners[kitty] = msg.sender;
      Adopted(kitty, msg.sender);
    }
  }
}
