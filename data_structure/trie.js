// Trie 

class Node {
    constructor(value){
     this.value = value
     this.isWordEnd = false
     this.children = {}
    }
}

class Trie {
    constructor(){
        this.root = new Node(null)
    }

    insert(word){
        let current = this.root

        word = word.toLowerCase()
        
        for (let char of word){

            if(!(char in current.children)){
                current.children[char] = new Node(char)
                current = current.children[char]
                continue
            } 
                current = current.children[char]
        }
        current.isWordEnd = true
        console.log('Insert Successful')
        return true
    }

    search(word){
        let current = this.root
        for (let char of word){
            if(!(char in current.children)){
                console.log(false)
                return false
            }
            current = current.children[char]
            continue
        }
        console.log(current.isWordEnd)
        return current.isWordEnd
    }

    //////////////Helper functions //////////////////////////
    stacker(currentNode,stack, temp){
        let result = []
        let childrenKeys = Object.keys(currentNode.children) 
        let childrenLength = childrenKeys.length
        temp += currentNode.value 

        if(currentNode.isWordEnd){
            result.push(temp)
            if(!childrenLength && !stack.length) {
                return {result, stack}
            }
        }

        if(childrenLength){     
            for (let i=0; i<childrenLength;i++){
                if(i > 0) {
                    const nodeMap = {}
                    nodeMap.node = currentNode.children[childrenKeys[i]]
                    nodeMap.temp = temp
                    stack.push(nodeMap) 
                } 
            } 
          
            const xxx =  this.stacker(currentNode.children[childrenKeys[0]], stack, temp)
            result = [...result, ...xxx.result]
            stack = xxx.stack
           
            while(stack.length){
              const stackNodeMap = stack.pop()
              const stackNode = stackNodeMap.node
              const stackNodeTemp = stackNodeMap.temp
              const yyy = this.stacker(stackNode, stack, stackNodeTemp)
              result = [...result, ...yyy.result]
              stack = yyy.stack
            }
        }
        return {result, stack}
    } 
///////////////////////////////////////////////////////////////////

    startsWith(prefix){
        let stack = []
        let current = this.root
        let temp = ""

        if(!prefix) {
            console.log([])
            return
        }

        prefix = prefix.toLowerCase()

        for (let char of prefix){
            if(char in current.children){
                current = current.children[char]
            }else{
                current = null
                console.log([])
                return []
            }
        }

        temp = prefix.slice(0, -1)
       
        const  {result} = this.stacker(current, stack, temp)
      
        console.log(result)
        return result
    }   

    findAll(){
       let stack = []
       let current = this.root
       let temp = ""
       let childrenKeys = Object.keys(current.children) 
       let childrenLength = childrenKeys.length 
       let firstChild = current.children[childrenKeys[0]]

       if(!childrenLength) {
        console.log([])
        return []
       }

       for (let i=0; i < childrenLength; i++){
        if(i > 0) {
            const nodeMap = {}
            nodeMap.node = current.children[childrenKeys[i]]
            nodeMap.temp = temp
            stack.push(nodeMap) 
        } 
      } 

       const  {result} = this.stacker(firstChild, stack, temp)

       console.log(result)
       return result
    }
}

const trie = new Trie()

trie.insert("cat") 
trie.insert("booking") 
trie.insert("vanilla") 
trie.insert('can') 
trie.insert('cob')
trie.insert('crept')
trie.insert('booked') 
trie.insert('coil')
trie.insert('moon')
trie.insert('carnival') 
trie.insert('cobler')
trie.insert('hipopotamus')
trie.insert('candid')
trie.insert('book') 

trie.startsWith('can')
// trie.findAll()
// trie.search('book')
