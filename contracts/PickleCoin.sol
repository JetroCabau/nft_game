// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PickleCoin is ERC721, Ownable {
     constructor(string memory _name, string memory _symbol)
     ERC721(_name, _symbol)
    {}

    uint256 COUNTER;

    uint256 fee = 1 ether;

    struct Pickle {
        string name;
        uint256 id;
        uint256 dna;
        uint8 level;
        uint8 rarity;
    }

    Pickle[] public pickle;

    event NewPickle(address indexed owner, uint256 id, uint256 dna);

    // Helpers
    function _createRandomNum(uint256 _mod) internal view returns(uint256) {
        uint256 randomNum = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender)));
        return randomNum % _mod;
    }

    function updateFee(uint256 _fee) external onlyOwner() {
        fee = _fee;
    }

    function withdraw() external payable onlyOwner() {
        address payable _owner = payable(owner());
        _owner.transfer(address(this).balance);
    }

    // Creation
    function _createPickle(string memory _name) internal{
        uint8 randRarity = uint8(_createRandomNum(100));
        uint256 randDna = _createRandomNum(10**16);
        Pickle memory newPickle = Pickle(_name, COUNTER, randDna, 1, randRarity);
        pickle.push(newPickle);
        _safeMint(msg.sender, COUNTER);
        emit NewPickle(msg.sender, COUNTER, randDna);
        COUNTER++;
    }

    function createRandomPickle(string memory _name) public payable {
        require(msg.value == fee, "The fee is not correct");
        _createPickle(_name);
    }

    // Getters
    function getPickle() public view returns(Pickle[] memory){
        return pickle;
    }

    function getOwnerPickle(address _owner) public view returns (Pickle[] memory) {
        Pickle[] memory result = new Pickle[](balanceOf(_owner));
        uint256 counter = 0;
        for(uint256 i = 0; i < pickle.length; i++) {
            if(ownerOf(i) == _owner) {
                result[counter] = pickle[i];
                counter++;
            }
        }
        return result;
    }
}
