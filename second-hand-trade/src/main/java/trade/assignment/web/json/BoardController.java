/*
 * created by 김동수 on board 게시판 컨트롤러
 * */

package trade.assignment.web.json;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import trade.assignment.domain.Board;
import trade.assignment.service.BoardService;

@RestController
@RequestMapping("/board")
public class BoardController {
    
    @Autowired BoardService boardService;
    
    @PostMapping("boardUp")
    public Object BoardUp(Board board, MultipartFile photo) {
        
        HashMap<String, Object> result = new HashMap<>();
        try {
            boardService.add(board, photo);
            result.put("status", "success");

        } catch (Exception e) {
            result.put("status", "fail");
            result.put("message", e.getMessage());
        }
        return result;
    }
    
    @GetMapping("list")
    public Object list(
            @RequestParam(defaultValue="1") int page, 
            @RequestParam(defaultValue="15") int size) throws Exception {
        
        if (page < 1) page = 1;
        if (size < 1 || size > 30) size = 15;
        
        List<Board> list = boardService.list(page, size);
        
        HashMap<String,Object> data = new HashMap<>();
        data.put("list", list);
        data.put("page", page);
        data.put("size", size);
        data.put("totalPage", 
                boardService.getTotalPage(size));
        return data;
    }
    
    @GetMapping("delete")
    public Object delete(int no) throws Exception {
        HashMap<String,Object> result = new HashMap<>();
        if (boardService.delete(no) == 0) {
            result.put("status", "fail");
            result.put("error", "해당 아이디가 없습니다.");
        } else {
            result.put("status", "success");
        }
        return result;
    }
    
    @PostMapping("update")
    public Object update(Board board) {
        
        boardService.update(board);
        
        HashMap<String,Object> result = new HashMap<>();
        result.put("status", "success");
        return result;
    }
    
    @GetMapping("view/{no}")
    public Object view(@PathVariable int no) throws Exception{
        
        HashMap<String,Object> data = new HashMap<>();
        data.put("board", boardService.get(no));
        return data;
    }
}